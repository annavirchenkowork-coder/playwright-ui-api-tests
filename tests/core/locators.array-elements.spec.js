import { test, expect } from "@playwright/test";

/**
 * Scope: Bulk element handling
 * Proves: list querying, count assertions, visibility/enabled, and href presence
 * Site: https://practice.cydeo.com
 * Tags: @core
 */
test.describe("@core Array of elements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });

  test("list has a healthy number of links", async ({ page }) => {
    const count = await page.locator("ul.list-group a").count();
    expect(count).toBeGreaterThan(20);
  });

  test("all links are visible, enabled, and clickable", async ({ page }) => {
    const links = page.locator("ul.list-group a");
    const count = await links.count();

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
    }
  });

  test("all links expose non-empty href attributes", async ({ page }) => {
    const links = page.locator("ul.list-group a");
    const count = await links.count();

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute("href", /.+/);
    }
  });
});
