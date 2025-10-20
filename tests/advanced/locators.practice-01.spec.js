import { test } from "@playwright/test";

test.describe("@advanced TestGroup", () => {
  // create beforeEach hook to navigate to "https://practice.cydeo.com"
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });

  test("innerText(): retrives the visible text", async ({ page }) => {
    let headerElement = page.locator("//span[@class='h1y']");
    let actualHeaderText = await headerElement.innerText();
    console.log(actualHeaderText);
  });

  test("inputValue(): only works with <input>, <textarea>, <select>, retrives the input value", async ({
    page,
  }) => {
    let inputLink = page.getByText("Inputs");
    await inputLink.click();

    let inputBox = page.locator("//input[@type='number']");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await inputBox.fill("123");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let inputBoxValue = await inputBox.inputValue();
    console.log(inputBoxValue);
  });

  test("getAttribute(): it retrives the attribute value", async ({ page }) => {
    let abTestingLink = page.locator("text='A/B Testing'");
    let hrefLink = await abTestingLink.getAttribute("href");
    console.log(hrefLink);
  });
});
