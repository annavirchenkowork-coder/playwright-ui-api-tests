import { test, expect } from "@playwright/test";

/**
 * Scope: Locator fundamentals
 * Proves: role/text/css selectors, nth targeting, and scoped queries
 * Site: https://practice.cydeo.com
 * Tags: @core
 */
test.describe("@core Locator basics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    await expect(page).toHaveTitle(/Practice/i);
  });

  test("navigate via accessible role and verify destination", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "A/B Testing" }).click();
    await expect(page).toHaveURL(/\/abtest/);
    await expect(page.getByRole("heading")).toContainText(/A\/B Test/i);
  });

  test("getByText for stable link selection", async ({ page }) => {
    await page.getByText("Inputs", { exact: true }).click();
    const number = page.locator('input[type="number"]');
    await number.fill("42");
    await expect(number).toHaveValue("42");
  });

  test("CSS + nth: target a specific item in a list", async ({ page }) => {
    const listItems = page.locator("ul.list-group a");
    const third = listItems.nth(2);
    const count = await listItems.count();
    expect(count).toBeGreaterThan(3);

    await expect(third).toBeVisible();
    await expect(third).toHaveAttribute("href", /.+/);
  });

  test("scoped queries within a section", async ({ page }) => {
    // Scope to the main content container and assert presence of key links
    const main = page.locator("#content");
    await expect(main.getByRole("link", { name: "Checkboxes" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Dropdown" })).toBeVisible();
  });
});
