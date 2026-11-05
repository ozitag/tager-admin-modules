import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import RequestError from "./request-error";
import {
  convertRequestErrorToMap,
  convertStringToNumberIfValid,
  generateNumberArray,
  getMessageByStatusCode,
  getMessageFromError,
  getSearchString,
  isAbsoluteUrl,
  trimTrailingSlash,
  urlTranslit,
} from "./common";

/** `RequestError` logs itself on construction, which would spam the reporter. */
function createRequestError(params: {
  status: number;
  statusText?: string;
  url?: string;
  body?: unknown;
}) {
  return new RequestError({
    status: params.status,
    statusText: params.statusText ?? "",
    url: params.url ?? "https://api.example.com/endpoint",
    body: (params.body ?? null) as never,
  });
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getSearchString", () => {
  it("returns an empty string when there is nothing to serialize", () => {
    expect(getSearchString()).toBe("");
    expect(getSearchString({})).toBe("");
  });

  it("prefixes the serialized params with '?'", () => {
    expect(getSearchString({ page: "2" })).toBe("?page=2");
  });

  it("percent-encodes keys and values", () => {
    expect(getSearchString({ "filter[name]": "a b&c" })).toBe(
      "?filter%5Bname%5D=a+b%26c"
    );
  });
});

describe("trimTrailingSlash", () => {
  it("removes a single trailing slash", () => {
    expect(trimTrailingSlash("https://example.com/")).toBe(
      "https://example.com"
    );
  });

  it("leaves urls without a trailing slash untouched", () => {
    expect(trimTrailingSlash("https://example.com")).toBe(
      "https://example.com"
    );
  });

  it("removes only the last slash", () => {
    expect(trimTrailingSlash("a//")).toBe("a/");
  });

  it("handles the empty string", () => {
    expect(trimTrailingSlash("")).toBe("");
  });
});

describe("isAbsoluteUrl", () => {
  it("accepts urls carrying a scheme", () => {
    expect(isAbsoluteUrl("https://example.com/path")).toBe(true);
    expect(isAbsoluteUrl("mailto:someone@example.com")).toBe(true);
  });

  it("rejects relative paths", () => {
    expect(isAbsoluteUrl("/path")).toBe(false);
    expect(isAbsoluteUrl("example.com")).toBe(false);
  });

  it("rejects empty and null input", () => {
    expect(isAbsoluteUrl("")).toBe(false);
    expect(isAbsoluteUrl(null)).toBe(false);
  });
});

describe("convertStringToNumberIfValid", () => {
  it("converts numeric strings, ignoring surrounding whitespace", () => {
    expect(convertStringToNumberIfValid("42")).toBe(42);
    expect(convertStringToNumberIfValid("  -1.5 ")).toBe(-1.5);
  });

  it("returns the original string when it is not numeric", () => {
    expect(convertStringToNumberIfValid("abc")).toBe("abc");
  });

  it("turns an empty string into 0, because Number('') is 0", () => {
    expect(convertStringToNumberIfValid("")).toBe(0);
  });
});

describe("generateNumberArray", () => {
  it("produces a zero-based sequence", () => {
    expect(generateNumberArray(4)).toEqual([0, 1, 2, 3]);
  });

  it("returns an empty array for length 0", () => {
    expect(generateNumberArray(0)).toEqual([]);
  });
});

describe("getMessageByStatusCode", () => {
  it.each([
    [401, "User is not authorized"],
    [403, "Forbidden"],
    [500, "Server error"],
    [502, "Server is not available"],
  ])("maps %i to its dedicated message", (status, expected) => {
    expect(getMessageByStatusCode(createRequestError({ status }))).toBe(
      expected
    );
  });

  it("includes the url for 404", () => {
    const error = createRequestError({
      status: 404,
      url: "https://api.example.com/missing",
    });

    expect(getMessageByStatusCode(error)).toBe(
      'Server endpoint "https://api.example.com/missing" is not found'
    );
  });

  it("falls back to statusText for unmapped codes", () => {
    const error = createRequestError({ status: 418, statusText: "Teapot" });

    expect(getMessageByStatusCode(error)).toBe("Teapot");
  });
});

describe("getMessageFromError", () => {
  it("prefers the message carried by the response body", () => {
    const error = createRequestError({
      status: 500,
      body: { message: "Database is unreachable" },
    });

    expect(getMessageFromError(error)).toBe("Database is unreachable");
  });

  it("falls back to the status-code message for an empty body", () => {
    expect(getMessageFromError(createRequestError({ status: 500 }))).toBe(
      "Server error"
    );
  });

  it("uses the message of a plain Error", () => {
    expect(getMessageFromError(new Error("boom"))).toBe("boom");
  });

  it("reports unknown for values that are not errors", () => {
    expect(getMessageFromError("boom")).toBe("Unknown error");
    expect(getMessageFromError(undefined)).toBe("Unknown error");
  });
});

describe("convertRequestErrorToMap", () => {
  it("flattens a validation body into field -> message", () => {
    const error = createRequestError({
      status: 422,
      body: {
        message: "Validation failed",
        errors: {
          email: { code: "required", message: "Email is required" },
          name: { message: "Name is too short" },
        },
      },
    });

    expect(convertRequestErrorToMap(error)).toEqual({
      email: "Email is required",
      name: "Name is too short",
    });
  });

  it("returns an empty map for a non-validation body", () => {
    const error = createRequestError({
      status: 500,
      body: { message: "Server error" },
    });

    expect(convertRequestErrorToMap(error)).toEqual({});
  });

  it("returns an empty map for a plain Error", () => {
    expect(convertRequestErrorToMap(new Error("boom"))).toEqual({});
  });
});

describe("urlTranslit", () => {
  it("transliterates lowercase cyrillic", () => {
    expect(urlTranslit("привет")).toBe("privet");
  });

  it("lowercases the result of uppercase input", () => {
    expect(urlTranslit("Привет")).toBe("privet");
  });

  it("handles the multi-letter sequences", () => {
    expect(urlTranslit("щука")).toBe("shchuka");
    expect(urlTranslit("ёж")).toBe("yozh");
  });

  it("turns spaces, underscores and hyphens into a single hyphen", () => {
    expect(urlTranslit("привет мир")).toBe("privet-mir");
    expect(urlTranslit("a_b-c d")).toBe("a-b-c-d");
    expect(urlTranslit("a   b")).toBe("a-b");
  });

  it("drops characters that are neither latin alphanumerics nor cyrillic", () => {
    expect(urlTranslit("hello!?world")).toBe("helloworld");
  });

  it("keeps latin alphanumerics as they are", () => {
    expect(urlTranslit("Page42")).toBe("page42");
  });

  it("drops the soft and hard signs", () => {
    expect(urlTranslit("объём")).toBe("obyom");
  });
});
