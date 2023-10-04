import { Products } from "public/API";
import { Cursor, Product } from "backend/stores/Products";
import { random, Random } from "public/random";

export const startingPage = { limit: 10, offset: 0 };

export enum State {
  LOADING = "Loading",
  EMPTY = "Empty",
  LIST = "List",
}
export const App = ($: typeof $w, random: Random) => {
  let cursor = { ...startingPage };
  let cache: Product[] = [];

  const appState: $w.MultiStateBox = $("#appState");
  const repeater: $w.Repeater = $("#products");
  const addMore: $w.Button = $("#addMore");
  const loadMore: $w.Button = $("#loadMore");

  appState.changeState(State.LOADING);
  repeater.data = [];

  const loadPage = async (page: Cursor) => {
    if (repeater.data.length === 0 || page === startingPage) {
      appState.changeState(State.LOADING);
    }

    const products = await Products.getProducts(
      { field: "_createdDate", order: "desc" },
      page
    );
    cache =
      page == startingPage ? products.items : [...products.items, ...cache];

    repeater.data = cache;

    if (repeater.data.length === 0) {
      appState.changeState(State.EMPTY);
    } else {
      appState.changeState(State.LIST);
    }

    cursor = products.cursor;
    products.cursor ? loadMore.enable() : loadMore.disable();
  };

  loadMore.onClick(async () => cursor && (await loadPage(cursor)));

  addMore.onClick(async () => {
    const newProduct = {
      title: random.string(),
      price: random.number(),
    };
    await Products.addProduct(newProduct.title, newProduct.price);

    await loadPage(startingPage);
  });

  repeater.onItemReady(($item: $w.$w, itemData: Product) => {
    $item("#productName").text = itemData.title;
    $item("#productPrice").text = itemData.price.toFixed(2);
    $item("#productCreated").text = itemData._createdDate.toDateString();

    $item("#delete").onClick(async () => {
      await Products.deleteProduct(itemData._id);
      await loadPage(startingPage);
    });
  });

  return () => loadPage(startingPage);
};

$w.onReady(() => {
  App($w, random)();
});
