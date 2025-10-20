import { test } from "@playwright/test";

test.describe("@regression TestGroup", () => {
  //create beforeEach hook to navigate to "https://practice.cydeo.com"
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });

  //create afterEach hook to wait for 1 second
  test.afterEach(async ({ page }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  test("Left Click", async ({ page }) => {
    await page.click("text='A/B Testing'");
  });

  test("Right Click ", async ({ page }) => {
    await page.click("text='A/B Testing'", { button: "right" });
  });

  test("Hover", async ({ page }) => {
    await page.hover("text='Hovers'");
    await page.click("text='Hovers'");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.hover("//img[@alt='User Avatar']");

    let elements = await page.locator("//img[@alt='User Avatar']").all();

    for (let element of elements) {
      await element.hover();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });

  test("Mouse wheel scrolling", async ({ page }) => {
    //scroll down the page
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1000);
    //scroll up the page
    await page.mouse.wheel(0, -4000);
    await page.waitForTimeout(1000);
  });

  test("Drag and Drop", async ({ page }) => {
    await page.click("text='Drag and Drop'");
    await page.waitForTimeout(1000);

    //use dragAndDrop method for drag and drop action
    //await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");

    let squareA = page.locator("//div[@id='column-a']");
    let squareB = page.locator("//div[@id='column-b']");

    //OR use dragTo method for drag and drop action
    await squareA.dragTo(squareB);
    await page.waitForTimeout(1000);
  });
});
