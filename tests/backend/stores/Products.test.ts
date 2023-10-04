import { describe, expect, it, jest } from "@jest/globals";
import {
  getProducts,
  addProduct,
  deleteProduct,
  Product,
  authOptions,
  Sort,
} from "backend/stores/Products";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import wixData from "../../fakes/wix-data";

const collection = "Products";

describe("Product Functions", () => {
  describe("getProducts", () => {
    it("should return paginated products with correct sorting", async () => {
      const fakeQueryBuilder = {
        ascending: jest.fn().mockReturnThis(),
        descending: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        find: jest.fn(),
      };

      const sort: Sort = { field: "title", order: "asc" };
      const cursor = { limit: 10, offset: 0 };
      const fakeProducts = [
        {
          _id: uuidv4(),
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
        },
        {
          _id: uuidv4(),
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
        },
      ];

      wixData.query.mockImplementation((name: string) => {
        expect(name).toBe(collection);
        return fakeQueryBuilder;
      });

      wixData.query(collection).find.mockImplementation(() => ({
        items: fakeProducts,
        totalCount: fakeProducts.length,
      }));

      const result = await getProducts(sort, cursor);

      expect(wixData.query).toHaveBeenCalledWith(collection);
      expect(wixData.query(collection).ascending).toHaveBeenCalledWith(
        sort.field.toString()
      );
      expect(wixData.query(collection).skip).toHaveBeenCalledWith(
        cursor.offset
      );
      expect(wixData.query(collection).limit).toHaveBeenCalledWith(
        cursor.limit
      );
      expect(wixData.query(collection).find).toHaveBeenCalledWith(authOptions);

      expect(result.items).toEqual(fakeProducts);
      expect(result.total).toEqual(fakeProducts.length);
      expect(result.cursor).toBeNull();
    });
  });

  describe("addProduct", () => {
    it("should add a new product", async () => {
      const name = faker.commerce.productName();
      const price = faker.commerce.price();
      const id = uuidv4();
      const fakeProduct: Product = {
        _id: id,
        _createdDate: new Date(),
        _updatedDate: new Date(),
        _ownerId: "",
        title: name,
        price: price,
      };

      wixData.insert.mockImplementation(() => Promise.resolve(fakeProduct));

      const result = await addProduct(name, price, id);

      expect(wixData.insert).toHaveBeenCalledWith(
        collection,
        { _id: id, title: name, price: price },
        authOptions
      );
      expect(result).toEqual(fakeProduct);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product by ID", async () => {
      const id = uuidv4();

      await deleteProduct(id);

      expect(wixData.remove).toHaveBeenCalledWith(collection, id, authOptions);
    });
  });
});
