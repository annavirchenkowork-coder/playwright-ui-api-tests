import { test, expect } from "@playwright/test";

/**
 * Scope: Environment-driven config
 * Proves: test suite reads secrets from env and uses them in HTTP flows (Basic Auth)
 * Inputs: PRACTICE_USERNAME / PRACTICE_PASSWORD
 * Tags: @advanced @env-test
 */
const hasCreds = !!(
  process.env.PRACTICE_USERNAME && process.env.PRACTICE_PASSWORD
);
test.skip(!hasCreds, "requires PRACTICE_USERNAME and PRACTICE_PASSWORD");

test("@advanced @env-test credentials are available at runtime", async () => {
  // Intentionally NOT logging secrets; just asserting presence for CI visibility.
  expect(process.env.PRACTICE_USERNAME).toBeTruthy();
  expect(process.env.PRACTICE_PASSWORD).toBeTruthy();
});

test("@advanced basic auth via header using base64-encoded credentials", async ({
  page,
}) => {
  const encoded = Buffer.from(
    `${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`
  ).toString("base64");

  await page.setExtraHTTPHeaders({ Authorization: `Basic ${encoded}` });
  await page.goto("https://practice.cydeo.com/basic_auth");

  // Page renders success text when credentials are valid.
  await expect(
    page.locator("text=Congratulations! You must have the proper credentials.")
  ).toBeVisible();
});
