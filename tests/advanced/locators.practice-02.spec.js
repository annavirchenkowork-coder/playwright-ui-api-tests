import { test, expect } from "@playwright/test";

/**
 * Scope: Form controls (checkbox, radio/select)
 * Proves: reliable state toggling & value selection with assertions
 * Site: https://practice.cydeo.com
 * Tags: @advanced
 */
test.describe("@advanced Locator practice 02", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });

  test("check(): selects an unchecked checkbox", async ({ page }) => {
    await page.getByRole("link", { name: "Checkboxes" }).click();

    const checkbox1 = page.locator("#box1");
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
  });

  test("uncheck(): clears a checked checkbox", async ({ page }) => {
    await page.getByRole("link", { name: "Checkboxes" }).click();

    const checkbox2 = page.locator("#box2");
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
  });

  test("selectOption(): chooses value from <select>", async ({ page }) => {
    await page.getByRole("link", { name: "Dropdown" }).click();

    const simple = page.locator("select#dropdown");
    await simple.selectOption({ index: 1 }); // Option 1
    await expect(simple).toHaveValue("1"); // assert selected value
  });
});
