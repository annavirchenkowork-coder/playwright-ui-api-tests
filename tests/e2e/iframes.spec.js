import { test, expect } from "@playwright/test";

test("@regression iframe test", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/iframe");
  let myFrame = page.frameLocator("//iframe[@id='mce_0_ifr']");

  let elementInsideFrame = myFrame.locator("//body[@id='tinymce']");

  await page.waitForTimeout(1000);

  await elementInsideFrame.clear();

  await page.waitForTimeout(1000);

  await elementInsideFrame.fill("Hello, this is an iframe!");

  await page.waitForTimeout(1000);

  await expect(elementInsideFrame).toHaveText("Hello, this is an iframe!");
});
