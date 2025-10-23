import { test, expect } from "@playwright/test";

/**
 * Scope: Core assertions
 * Proves: page title, checkbox state assertions, visible text verification
 * Site: https://practice.cydeo.com
 * Tags: @core
 */
test.describe("@core Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    await expect(page).toHaveTitle(/Practice/i);
  });

  test("checkboxes can be checked", async ({ page }) => {
    await page.getByRole("link", { name: "Checkboxes" }).click();
    const first = page.locator("#box1");
    const second = page.locator("#box2");

    await first.check();
    await second.check();

    await expect(first).toBeChecked();
    await expect(second).toBeChecked();
  });

  test("checkboxes can be unchecked", async ({ page }) => {
    await page.getByRole("link", { name: "Checkboxes" }).click();
    const first = page.locator("#box1");
    const second = page.locator("#box2");

    await first.uncheck();
    await second.uncheck();

    await expect(first).not.toBeChecked();
    await expect(second).not.toBeChecked();
  });

  test("headline has expected text", async ({ page }) => {
    const headline = page.locator("span.h1y");
    await expect(headline).toHaveText("Test Automation Practice");
  });
});
