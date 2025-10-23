import { test, expect } from "@playwright/test";

/**
 * Scope: Core Playwright API usage
 * Proves: navigation, url/title checks, typing/clicking, evaluation, and context isolation
 * Site: https://practice.cydeo.com
 * Tags: @core @api
 */
test.describe("@core Playwright core API", () => {
  test("page navigation + title/url assertions", async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    await expect(page).toHaveTitle(/Practice/i);
    await expect(page).toHaveURL(/practice\.cydeo\.com/);
  });

  test("typing and clicking with auto-waiting", async ({ page }) => {
    await page.goto("https://practice.cydeo.com/inputs");
    const number = page.locator('input[type="number"]');
    await number.fill("123");
    await page.keyboard.press("Tab");
    await expect(number).toHaveValue("123");
  });

  test("client-side evaluation", async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    // count links inside the main list using page.evaluate for a quick DOM read
    const linkCount = await page.evaluate(
      () => document.querySelectorAll("ul.list-group a").length
    );
    expect(linkCount).toBeGreaterThan(10);
  });

  test("newContext isolation", async ({ browser }) => {
    const ctx = await browser.newContext();
    const pg = await ctx.newPage();
    await pg.goto("https://practice.cydeo.com");
    await expect(pg).toHaveTitle(/Practice/i);
    await ctx.close();
  });
});
