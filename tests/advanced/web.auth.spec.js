import { test, expect } from "@playwright/test";

/**
 * Scope: Basic authentication strategies
 * Proves: header-based and context-level auth; documents why URL-embedded auth is discouraged
 * Site: https://practice.cydeo.com/basic_auth
 * Tags: @advanced @auth
 */

// FYI: URL-embedded credentials are deprecated/blocked by many browsers.
// Keeping as skipped to document awareness; unskip only for safe internal environments.
test.skip("@advanced URL-embedded credentials (discouraged)", async ({
  page,
}) => {
  await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
  await expect(page.locator("text=Congratulations!")).toBeVisible();
});

test("@advanced header-based basic auth via base64", async ({ page }) => {
  const encoded = Buffer.from("admin:admin").toString("base64");
  await page.setExtraHTTPHeaders({ Authorization: `Basic ${encoded}` });
  await page.goto("https://practice.cydeo.com/basic_auth");
  await expect(page.locator("text=Congratulations!")).toBeVisible();
});

test("@advanced httpCredentials at browser context", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: "admin", password: "admin" },
  });
  const page = await context.newPage();
  await page.goto("https://practice.cydeo.com/basic_auth");
  await expect(page.locator("text=Congratulations!")).toBeVisible();
  await context.close();
});
