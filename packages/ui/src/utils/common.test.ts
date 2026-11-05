import type { LocationQuery } from "vue-router";
import { describe, expect, it } from "vitest";

import {
  createTabErrorFinder,
  cutUrlOrigin,
  floatParser,
  formatBoolean,
  getFilterParamAsNumber,
  getFilterParamAsNumberArray,
  getFilterParamAsString,
  getFilterParamAsStringArray,
  integerParser,
  isValidSelectOption,
} from "./common";

describe("formatBoolean", () => {
  it("maps truthy values to Yes", () => {
    expect(formatBoolean(true)).toBe("Yes");
    expect(formatBoolean(1)).toBe("Yes");
  });

  it("maps falsy values to No", () => {
    expect(formatBoolean(false)).toBe("No");
    expect(formatBoolean(null)).toBe("No");
    expect(formatBoolean(0)).toBe("No");
  });
});

describe("isValidSelectOption", () => {
  it("accepts an object carrying both value and label", () => {
    expect(isValidSelectOption({ value: 1, label: "One" })).toBe(true);
  });

  it("rejects an object missing either key", () => {
    expect(isValidSelectOption({ value: 1 })).toBeFalsy();
    expect(isValidSelectOption({ label: "One" })).toBeFalsy();
  });

  it("rejects null and primitives", () => {
    expect(isValidSelectOption(null)).toBeFalsy();
    expect(isValidSelectOption("value")).toBeFalsy();
  });
});

describe("createTabErrorFinder", () => {
  it("reports tabs whose fields overlap the error keys", () => {
    const hasErrors = createTabErrorFinder({
      email: "Email is required",
      name: "Name is too short",
    });

    expect(hasErrors(["email"])).toBe(true);
    expect(hasErrors(["phone", "name"])).toBe(true);
  });

  it("reports no errors for unrelated or empty field lists", () => {
    const hasErrors = createTabErrorFinder({ email: "Email is required" });

    expect(hasErrors(["phone"])).toBe(false);
    expect(hasErrors([])).toBe(false);
  });

  it("never reports errors when the error map is empty", () => {
    expect(createTabErrorFinder({})(["email"])).toBe(false);
  });
});

describe("integerParser", () => {
  it("accepts integers and an optional sign", () => {
    expect(integerParser("123", "")).toBe("123");
    expect(integerParser("-7", "")).toBe("-7");
    expect(integerParser("+7", "")).toBe("+7");
  });

  it("accepts intermediate input so the field can be cleared", () => {
    expect(integerParser("", "12")).toBe("");
    expect(integerParser("-", "")).toBe("-");
  });

  it("falls back to the previous value on invalid input", () => {
    expect(integerParser("12.5", "12")).toBe("12");
    expect(integerParser("abc", "12")).toBe("12");
  });
});

describe("floatParser", () => {
  it("accepts plain decimals", () => {
    expect(floatParser("1.5", "")).toBe("1.5");
    expect(floatParser("-0.25", "")).toBe("-0.25");
  });

  it("accepts intermediate input while typing", () => {
    expect(floatParser("1.", "1")).toBe("1.");
    expect(floatParser("", "1")).toBe("");
  });

  it("rewrites a comma into a dot", () => {
    expect(floatParser("1,5", "")).toBe("1.5");
  });

  /**
   * On a cyrillic keyboard these share a key with "." and "e",
   * so they are treated as typos rather than invalid input.
   */
  it("rewrites the cyrillic keys that sit where '.' does", () => {
    expect(floatParser("1б5", "")).toBe("1.5");
    expect(floatParser("1ю5", "")).toBe("1.5");
    expect(floatParser("1/5", "")).toBe("1.5");
  });

  it("rewrites the cyrillic lookalikes of 'e' in exponent notation", () => {
    expect(floatParser("1е5", "")).toBe("1e5");
    expect(floatParser("1у5", "")).toBe("1e5");
  });

  it("falls back to the previous value on invalid input", () => {
    expect(floatParser("abc", "1.5")).toBe("1.5");
    expect(floatParser("1.2.3", "1.2")).toBe("1.2");
  });
});

describe("cutUrlOrigin", () => {
  it("strips the origin from an absolute url", () => {
    expect(cutUrlOrigin("https://ozitag.com/search?query=some_text")).toBe(
      "/search?query=some_text"
    );
  });

  it("keeps the hash", () => {
    expect(cutUrlOrigin("https://ozitag.com/page#section")).toBe(
      "/page#section"
    );
  });

  it("returns relative urls untouched", () => {
    expect(cutUrlOrigin("/search?query=some_text")).toBe(
      "/search?query=some_text"
    );
  });

  it("returns an empty string untouched", () => {
    expect(cutUrlOrigin("")).toBe("");
  });
});

describe("filter param helpers", () => {
  /** The helpers look the key up under `filter[<key>]`. */
  const query: LocationQuery = {
    "filter[name]": "phone",
    "filter[categories]": ["1", "2"],
    "filter[empty]": null,
    name: "ignored-because-it-is-not-namespaced",
  };

  describe("getFilterParamAsString", () => {
    it("reads a namespaced string value", () => {
      expect(getFilterParamAsString(query, "name")).toBe("phone");
    });

    it("ignores a key that is not namespaced", () => {
      expect(getFilterParamAsString(query, "missing")).toBeNull();
    });

    it("returns null for array and null values", () => {
      expect(getFilterParamAsString(query, "categories")).toBeNull();
      expect(getFilterParamAsString(query, "empty")).toBeNull();
    });
  });

  describe("getFilterParamAsNumber", () => {
    it("converts a numeric string", () => {
      expect(getFilterParamAsNumber({ "filter[page]": "3" }, "page")).toBe(3);
    });

    it("returns null when the key is absent", () => {
      expect(getFilterParamAsNumber(query, "missing")).toBeNull();
    });

    it("returns NaN for a non-numeric string", () => {
      expect(getFilterParamAsNumber(query, "name")).toBeNaN();
    });
  });

  describe("getFilterParamAsStringArray", () => {
    it("returns array values as they are", () => {
      expect(getFilterParamAsStringArray(query, "categories")).toEqual([
        "1",
        "2",
      ]);
    });

    it("wraps a single string into an array", () => {
      expect(getFilterParamAsStringArray(query, "name")).toEqual(["phone"]);
    });

    it("returns an empty array for missing and null values", () => {
      expect(getFilterParamAsStringArray(query, "missing")).toEqual([]);
      expect(getFilterParamAsStringArray(query, "empty")).toEqual([]);
    });

    it("drops null entries inside an array", () => {
      expect(
        getFilterParamAsStringArray({ "filter[ids]": ["1", null] }, "ids")
      ).toEqual(["1"]);
    });
  });

  describe("getFilterParamAsNumberArray", () => {
    it("converts every entry of an array", () => {
      expect(getFilterParamAsNumberArray(query, "categories")).toEqual([1, 2]);
    });

    it("wraps a single numeric string into an array", () => {
      expect(
        getFilterParamAsNumberArray({ "filter[page]": "3" }, "page")
      ).toEqual([3]);
    });

    it("drops entries that are not numeric", () => {
      expect(
        getFilterParamAsNumberArray({ "filter[ids]": ["1", "abc"] }, "ids")
      ).toEqual([1]);
    });

    it("returns an empty array for a non-numeric single value", () => {
      expect(getFilterParamAsNumberArray(query, "name")).toEqual([]);
    });

    it("returns an empty array for missing and null values", () => {
      expect(getFilterParamAsNumberArray(query, "missing")).toEqual([]);
      expect(getFilterParamAsNumberArray(query, "empty")).toEqual([]);
    });
  });
});
