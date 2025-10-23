import { test, expect } from "@playwright/test";

/**
 * Scope: Locators fundamentals with business-like assertions
 * Proves: extracting text, reading input values, and attribute inspection
 * Site: https://practice.cydeo.com
 * Tags: @advanced
 */
test.describe("@advanced Locator practice 01", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });

  test("innerText(): verify page headline is visible to the user", async ({
    page,
  }) => {
    // Using a robust selector; portfolio-friendly assertion rather than console output.
    const headline = page.getByRole("heading").first();
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/Practice|Cydeo/i);
  });

  test("inputValue(): fills numeric input and validates persisted value", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Inputs" }).click();

    const numberInput = page.locator('input[type="number"]');
    await numberInput.fill("123");
    await expect(numberInput).toHaveValue("123");
  });

  test("getAttribute(): verifies A/B Testing link target path", async ({
    page,
  }) => {
    const abLink = page.getByRole("link", { name: "A/B Testing" });
    await expect(abLink).toBeVisible();
    const href = await abLink.getAttribute("href");
    // Expect relative link to contain target path; keeps test stable across domains.
    expect(href).toContain("/abtest");
  });
});
