import { jest } from "@jest/globals";

export const query = jest.fn((collectionName: string) => ({
  ascending: jest.fn().mockReturnThis(),
  descending: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  find: jest.fn(),
}));

export const insert = jest.fn();
export const remove = jest.fn();

export default {
  query: query,
  insert: jest.fn(),
  remove: jest.fn(),
};
