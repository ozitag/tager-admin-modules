import { describe, expect, it } from "vitest";

import {
  isFileObject,
  isNonNullObject,
  isNotFalsy,
  isNotNullish,
  isNullable,
  isNullish,
  isNumber,
  isString,
  isValidationErrorsBody,
  notEmpty,
} from "./type-guards";

describe("isString", () => {
  it("accepts strings, including empty ones", () => {
    expect(isString("")).toBe(true);
    expect(isString("text")).toBe(true);
  });

  it("rejects non-strings", () => {
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(["a"])).toBe(false);
    expect(isString(new String("boxed"))).toBe(false);
  });
});

describe("isNumber", () => {
  it("accepts finite and infinite numbers", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1.5)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
  });

  it("rejects NaN", () => {
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Number("not a number"))).toBe(false);
  });

  it("rejects numeric strings", () => {
    expect(isNumber("1")).toBe(false);
  });
});

describe("isNonNullObject", () => {
  it("accepts objects and arrays", () => {
    expect(isNonNullObject({})).toBe(true);
    expect(isNonNullObject([])).toBe(true);
  });

  it("rejects null despite its typeof being 'object'", () => {
    expect(isNonNullObject(null)).toBe(false);
  });

  it("rejects primitives", () => {
    expect(isNonNullObject("text")).toBe(false);
    expect(isNonNullObject(undefined)).toBe(false);
  });
});

describe("isNullish / isNullable", () => {
  it("isNullish covers both null and undefined", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it("isNullable covers null only", () => {
    expect(isNullable(null)).toBe(true);
    expect(isNullable(undefined)).toBe(false);
  });

  it("treats falsy-but-present values as non-nullish", () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(false)).toBe(false);
  });
});

describe("isNotNullish", () => {
  it("is the inverse of isNullish", () => {
    for (const value of [null, undefined, 0, "", false, NaN, {}]) {
      expect(isNotNullish(value)).toBe(!isNullish(value));
    }
  });

  it("is re-exported as notEmpty", () => {
    expect(notEmpty).toBe(isNotNullish);
  });

  it("keeps falsy-but-present entries when used as an array filter", () => {
    const input = [0, null, "", undefined, false];

    expect(input.filter(isNotNullish)).toEqual([0, "", false]);
  });
});

describe("isNotFalsy", () => {
  it("drops every falsy value, not just nullish ones", () => {
    const input = [1, 0, "a", "", null, undefined, false];

    expect(input.filter(isNotFalsy)).toEqual([1, "a"]);
  });
});

describe("isFileObject", () => {
  const file = {
    id: "1",
    mime: "image/png",
    name: "photo.png",
    size: 1024,
    url: "https://example.com/photo.png",
  };

  it("accepts a well-formed file object", () => {
    expect(isFileObject(file)).toBe(true);
  });

  it("tolerates unknown extra keys", () => {
    expect(isFileObject({ ...file, somethingElse: true })).toBe(true);
  });

  it("rejects objects with a missing or mistyped field", () => {
    const { id, mime, name, url } = file;

    expect(isFileObject({ id, mime, name, url })).toBe(false);
    expect(isFileObject({ ...file, size: "1024" })).toBe(false);
    expect(isFileObject(null)).toBe(false);
  });
});

describe("isValidationErrorsBody", () => {
  it("accepts a body carrying field errors", () => {
    expect(
      isValidationErrorsBody({
        message: "Validation failed",
        errors: { email: { code: "required", message: "Email is required" } },
      })
    ).toBe(true);
  });

  it("accepts errors without the optional code", () => {
    expect(
      isValidationErrorsBody({
        message: "Validation failed",
        errors: { email: { message: "Email is required" } },
      })
    ).toBe(true);
  });

  it("rejects a body without the errors map", () => {
    expect(isValidationErrorsBody({ message: "Server error" })).toBe(false);
  });

  it("rejects an error entry without a message", () => {
    expect(
      isValidationErrorsBody({
        message: "Validation failed",
        errors: { email: { code: "required" } },
      })
    ).toBe(false);
  });
});
