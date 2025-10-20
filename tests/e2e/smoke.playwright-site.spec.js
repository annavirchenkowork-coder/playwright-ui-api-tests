import { test, expect } from "@playwright/test";

test.describe("@smoke Smoke | Playwright site", () => {
  test("@smoke visits homepage and checks title", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("@smoke navigates to Get started", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.getByRole("link", { name: "Get started" }).click();
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });

  test("@smoke search works", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const search = page.getByRole("searchbox");
    await search.click();
    await search.fill("trace viewer");
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toContainText(/Trace Viewer/i);
  });
});
