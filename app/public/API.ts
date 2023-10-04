import * as API from "backend/ServiceLayer";
import { Response } from "backend/ServiceLayer";

type ResponseFn<T, Args extends any[]> = (
  ...args: Args
) => Promise<Response<T>>;

const fromResponse =
  <T, Args extends any[]>(from: ResponseFn<T, Args>) =>
  (...args: Args) => {
    return from(...args).then((response) => {
      if (response.status == "success") {
        return response.body;
      } else {
        throw new Error(response.error);
      }
    });
  };

export const Products = {
  getProducts: fromResponse(API.Product_getProducts),
  addProduct: fromResponse(API.Product_addProduct),
  deleteProduct: fromResponse(API.Products_deleteProduct),
};
