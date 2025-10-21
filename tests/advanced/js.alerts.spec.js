import { test, expect } from "@playwright/test";

/**
 * Scope: Native JS dialogs handling
 * Proves: accept/dismiss/prompt flows and page state updates
 * Site: https://practice.cydeo.com/javascript_alerts
 * Tags: @advanced
 */
test.describe("@advanced JavaScript alerts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/javascript_alerts");
  });

  test("accepts regular alert and verifies result message", async ({
    page,
  }) => {
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    await expect(page.locator("#result")).toHaveText(
      "You successfully clicked an alert"
    );
  });

  test("dismisses confirmation and verifies result message", async ({
    page,
  }) => {
    page.once("dialog", (d) => d.dismiss());
    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
  });

  test("accepts prompt with input and verifies result message", async ({
    page,
  }) => {
    page.once("dialog", (d) => d.accept("Prompt Input"));
    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
    await expect(page.locator("#result")).toHaveText(
      "You entered: Prompt Input"
    );
  });
});
