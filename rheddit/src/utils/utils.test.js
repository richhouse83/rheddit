import * as utils from "./utils";

describe("capitaliseString", () => {
  test("Returns a new string, with the input capitalised", () => {
    expect(utils.capitaliseString("hello")).toBe("Hello");
  });
});
