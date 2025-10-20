import { test } from "@playwright/test";

test.describe("FirstGroup", () => {
  test.beforeAll(async () => {
    console.log("Before all tests");
  });

  test.afterAll(async () => {
    console.log("After all tests");
  });

  test.beforeEach(async ({ page }) => {
    console.log("Before each test");
  });

  test("Test 1", async ({ page }) => {
    console.log("Testing Test 1");
  });
  test("Test 2", async ({ page }) => {
    console.log("Testing Test 2");
  });
  test("Test 3", async ({ page }) => {
    console.log("Testing Test 3");
  });
});
