import { App, State } from "pages/HOME.c1dmp";
import { describe, it, expect } from "@jest/globals";
import { testEnv } from "../fakes/jest.setup";
import { Products } from "../fakes/API";
import { random, Random } from "public/random";
import { waitUntil } from "../utils";

const now = new Date();
const randomName = random.string();
const randomPrice = random.number();
const randomItem = {
  title: randomName,
  price: randomPrice,
  _createdDate: now,
};

const fakeRandom: Random = {
  string: () => randomName,
  number: () => randomPrice,
};

describe("HOME.c1dmp.test.ts", () => {
  it("should result in empty state if no results are found", async () => {
    Products.getProducts.mockImplementation(() => ({ items: [], totals: 0 }));

    const $ = testEnv();

    const appState: $w.MultiStateBox = $("#appState");

    const app = App($, fakeRandom)();

    expect(appState.currentState).toBe(State.LOADING);

    await app;
    expect(appState.currentState).toBe(State.EMPTY);
  });

  it("should result in list view with items if data loads", async () => {
    const item = randomItem;
    Products.getProducts.mockImplementation(() => ({
      items: [item],
      totals: 1,
    }));

    const $ = testEnv();

    const appState: $w.MultiStateBox = $("#appState");
    const repeater: $w.Repeater = $("#products");

    await App($, fakeRandom)();

    expect(appState.currentState).toBe(State.LIST);

    expect(repeater.data).toStrictEqual([item]);

    expect($("#products[0] #productName").text).toBe(item.title);
    expect($("#products[0] #productPrice").text).toBe(item.price.toFixed(2));
    expect($("#products[0] #productCreated").text).toBe(
      item._createdDate.toDateString()
    );
  });

  it("should add random item, when clicking addMore", async () => {
    let times = 0;
    Products.getProducts.mockImplementation(() => {
      if (times === 0) {
        times++;
        return { items: [], totals: 0 };
      } else {
        return { items: [randomItem], totals: 1 };
      }
    });
    const addItem = Products.addProduct.mockImplementation(() =>
      Promise.resolve(randomItem)
    );

    const $ = testEnv();

    const appState: $w.MultiStateBox = $("#appState");
    const repeater: $w.Repeater = $("#products");
    const addMore = $("#addMore");

    await App($, fakeRandom)();

    expect(appState.currentState).toBe(State.EMPTY);

    addMore.click();

    expect(addItem).toHaveBeenCalledWith(randomName, randomPrice);

    await waitUntil(() => expect(appState.currentState).toBe(State.LIST));

    expect(repeater.data).toStrictEqual([randomItem]);
  });
});
