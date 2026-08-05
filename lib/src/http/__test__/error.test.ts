import { describe, expect, it } from "vitest";
import { getResponseError } from "../error.js";

describe("getResponseError", () => {
  it("returns the message field when the body is JSON with a message", async () => {
    const res = new Response(JSON.stringify({ message: "read me" }));
    expect(await getResponseError(res)).toBe("read me");
  });

  it("returns stringified JSON when it has no .message key", async () => {
    const jsonString = JSON.stringify({ whatever: "no message" });
    const res = new Response(jsonString);
    expect(await getResponseError(res)).toBe(jsonString);
  });

  it("falls back to stringified JSON when no message field", async () => {
    const res = new Response("some text");
    expect(await getResponseError(res)).toBe("some text");
  });
});
