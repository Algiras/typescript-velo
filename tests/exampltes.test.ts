import { describe, it, expect, jest } from "@jest/globals";
import { testEnv } from "./fakes/jest.setup";
import { faker } from "@faker-js/faker";

describe("Test examples", () => {
  describe("values", function () {
    it("should set a value on $element, makes it update", () => {
      const $ = testEnv();

      const $elm = $("#element1");
      const example = faker.lorem.slug();
      const onChange = jest.fn();

      $elm.onChange(onChange);
      $elm.value = example;

      expect($elm.value).toBe(example);
      expect(onChange).toHaveBeenCalledWith({ target: { value: example } });
    });

    it("should be able to enable/disable an element", () => {
      const $ = testEnv();

      const $elm = $("#element1");
      const onClick = jest.fn();

      $elm.disable();
      $elm.onClick(onClick);

      $elm.click();

      expect($elm.enabled).toBe(false);
      expect(onClick).not.toHaveBeenCalled();

      $elm.enable();

      $elm.click();

      expect($elm.enabled).toBe(true);
      expect(onClick).toHaveBeenCalled();
    });
  });

  it("should update component state", () => {
    const $ = testEnv();
    const $elm = $("#element1");
    const stateName1 = faker.lorem.slug();
    const stateName2 = faker.lorem.slug();

    $elm.changeState(stateName1);

    expect($elm.currentState).toBe(stateName1);

    $elm.changeState(stateName2);

    expect($elm.currentState).toBe(stateName2);
  });

  describe("repeaters", () => {
    const randomItem = () => ({
      _id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 1, max: 100 }),
    });

    it("should be render repeater items", () => {
      const $ = testEnv();
      const $elm: $w.Repeater = $("#element1");
      const item1 = randomItem();
      const item2 = randomItem();
      const data = [item1, item2];

      $elm.onItemReady(($item, itemData) => {
        $item("#name").text = itemData.name;
        $item("#price").text = itemData.price.toString();
      });

      $elm.data = data;

      expect($("#element1[0] #name").text).toBe(item1.name);
      expect($("#element1[0] #price").text).toBe(item1.price.toString());

      expect($("#element1[1] #name").text).toBe(item2.name);
      expect($("#element1[1] #price").text).toBe(item2.price.toString());
    });

    it("should support `at` syntax for item access", () => {
      const $ = testEnv();

      $("#price").onClick((event) => {
        const $item = $.at(event.context);
        $item("#name").text = "clicked";
      });

      $("#element1[0] #price").click();

      expect($("#element1[0] #name").text).toBe("clicked");
    });
  });

  describe("styles", () => {
    it("should support setting styles", () => {
      const $ = testEnv();
      const $elm = $("#element1");
      const black = "#000000";
      const white = "#FFFFFF";

      $elm.style.color = black;
      expect($elm.style.color).toBe(black);

      $elm.style.color = white;
      expect($elm.style.color).toBe(white);
    });
  });
});
