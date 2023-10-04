import wixData from "wix-data";
import { v4 as uuidv4 } from "uuid";

export interface Product {
  readonly _id: string;
  readonly _createdDate: Date;
  readonly _updatedDate: Date;
  readonly _ownerId: string;

  title: string;
  price: number;
}

export interface Sort {
  field: keyof Product;
  order: "asc" | "desc";
}

export interface Cursor {
  limit: number;
  offset: number;
}

export interface PagedResult {
  items: Product[];
  total: number;
  cursor?: Cursor;
}

export const authOptions = {
  suppressAuth: true,
  suppressHooks: true,
};

export const COLLECTION = "Products";

export async function getProducts(
  sort: Sort,
  cursor: Cursor
): Promise<PagedResult> {
  const query = await wixData.query(COLLECTION);

  const sortedQuery =
    sort.order === "asc"
      ? query.ascending(sort.field.toString())
      : query.descending(sort.field.toString());

  const products = await sortedQuery
    .skip(cursor.offset)
    .limit(cursor.limit)
    .find(authOptions);

  const nextOffset = cursor.offset + products.items.length;
  const hasNextPage = nextOffset < products.totalCount;
  const actualLimit = hasNextPage ? cursor.limit : products.items.length;

  return {
    items: products.items as Product[],
    total: products.totalCount,
    cursor: hasNextPage
      ? {
          limit: actualLimit,
          offset: nextOffset,
        }
      : null,
  };
}

export const addProduct = async (
  name: string,
  price: number,
  _id: string = uuidv4()
) => {
  const result = await wixData.insert(
    COLLECTION,
    {
      _id,
      title: name,
      price,
    },
    authOptions
  );

  return (result as Product) || null;
};

export const deleteProduct = async (id: string) => {
  return wixData.remove(COLLECTION, id, authOptions);
};
