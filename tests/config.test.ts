import { describe, expect, it } from "vitest";
import { readSiteConfig } from "../src/config/site.ts";

describe("production origin", () => {
  it("normalizes the root slash for a consistent canonical URL", () => {
    expect(readSiteConfig({ SITE_URL: "https://jessie.example/" })).toEqual({
      origin: "https://jessie.example",
      indexable: true,
    });
  });

  it.each([
    undefined,
    "",
    "not a URL",
    "http://jessie.example",
    "https://jessie.example/about",
    "https://user:pass@jessie.example",
    "https://jessie.example/?draft=true",
    "https://jessie.example/#draft",
  ])("prevents an unsafe or missing production origin: %s", (SITE_URL) => {
    expect(() => readSiteConfig({ SITE_URL })).toThrow("Set SITE_URL");
  });

  it("makes preview builds non-indexable even when production configuration is present", () => {
    expect(readSiteConfig({ SITE_URL: "https://jessie.example" }, true)).toEqual({
      origin: null,
      indexable: false,
    });
  });
});
