import { test, expect } from "@playwright/test";
import { link } from "fs";

test.describe("TestGroup", () => {
    let linkElements;

  // create beforeEach hook to navigate to "https://practice.cydeo.com"
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    linkElements = await page.locator("//ul[@class='list-group']//a").all();
  });

  test("Verify that there are exactly 50 link elements within the <ul>, tag", async ({
    page,
  }) => {
   
    console.log(linkElements.length);

    // Verify that there are exactly 50 link elements within the <ul>, tag
    expect(linkElements.length).toBe(50);
    expect(linkElements.length).toBeGreaterThanOrEqual(20);
  });

  test("Verify that there are exactly 50 link elements within the <ul>, tag is visible & clickable", async ({
    page,
  }) => {
    

    // Verify that there are exactly 50 link elements within the <ul>, tag is visible & clickable
    for (let linkElement of linkElements) {
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toBeEnabled();

      //OR
      expect(await linkElement.isVisible()).toBeTruthy();
      expect(await linkElement.isEnabled()).toBeTruthy();
    }
  });

  test("Verify that there are exactly 50 link elements within the <ul>, tag has a href attribute", async ({
    page,
  }) => {
    
    for (let linkElement of linkElements) {
      await expect(linkElement).toHaveAttribute("href");
    }
  });
});
