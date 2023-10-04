import * as Products from "./stores/Products";
import { Cursor, Sort } from "./stores/Products";

export interface SuccessResponse<T> {
  status: "success";
  body: T;
}

export interface FailureResponse {
  status: "error";
  error: string;
}

export type Response<T> = SuccessResponse<T> | FailureResponse;

const toResponse = <T>(from: Promise<T>): Promise<Response<T>> => {
  return from
    .then(
      (body) =>
        ({
          status: "success",
          body,
        } as SuccessResponse<T>)
    )
    .catch((error) => ({
      status: "error",
      error: (error.message || error) as string,
    }));
};

export const Product_addProduct = (name: string, price: number) => {
  return toResponse(Products.addProduct(name, price));
};

export const Product_getProducts = (sort: Sort, cursor: Cursor) => {
  return toResponse(Products.getProducts(sort, cursor));
};

export const Products_deleteProduct = (id: string) => {
  return toResponse(Products.deleteProduct(id));
};
