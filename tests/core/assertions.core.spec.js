import { test, expect } from "@playwright/test";

test.describe("TestGroup", () => {
  // create beforeEach hook to navigate to "https://practice.cydeo.com"
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
    //Title verification
    expect(page).toHaveTitle("Practice");
    //Or
    expect(await page.title()).toBe("Practice");
  });

  test("Verify checkboxes are checked", async ({ page }) => {
    await page.getByText("Checkboxes").click();
    let firstCheckbox = page.locator("input#box1");
    let secondCheckbox = page.locator("input#box2");

    await firstCheckbox.check();
    await secondCheckbox.check();
    //OR
    await expect(firstCheckbox).toBeChecked();
    await expect(secondCheckbox).toBeChecked();

    //--------------------------------------------------

    expect(await firstCheckbox.isChecked()).toBeTruthy();
    expect(await secondCheckbox.isChecked()).toBeTruthy();
  });

  test("Verify checkboxes are unchecked", async ({ page }) => {
    await page.getByText("Checkboxes").click();
    let firstCheckbox = page.locator("input#box1");
    let secondCheckbox = page.locator("input#box2");

    await firstCheckbox.uncheck();
    await secondCheckbox.uncheck();

    await expect(firstCheckbox).not.toBeChecked();
    await expect(secondCheckbox).not.toBeChecked();
    //OR
    expect(await firstCheckbox.isChecked()).toBeFalsy();
    expect(await secondCheckbox.isChecked()).toBeFalsy();
  });

  test("Vefify text of the element", async ({ page }) => {
    let headerElement = page.locator("span.h1y");

    await expect(headerElement).toHaveText("Test Automation Practice");

    let actualHeaderText = await headerElement.innerText();
    let expectedHeaderText = "Test Automation Practice";
    expect(actualHeaderText).toBe(expectedHeaderText);
    expect(actualHeaderText).toEqual(expectedHeaderText);
  });
});
