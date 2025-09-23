import { add } from "./add.js";
import assert from "assert/strict";

describe("TEST add.js", () => {
  it("should add two positive numbers", () => {
    const result = add(2, 3);
    assert.equal(result, 5);
  });

  it("shoud add two negative numbers", () => {
    const result = add(-2, -3);
    assert.equal(result, -5);
  });

  it("shoud add a negative and a positive numbers", () => {
    const result = add(2, -3);
    assert.equal(result, -1);
  });

  it("should throw an error when add number and string", () => {
    try {
      const result = add("ma chaine de caractères", 3);
    } catch (error) {
      assert.equal(error.message, "should be a number");
      return;
    }
    throw new Error();
  });
});
