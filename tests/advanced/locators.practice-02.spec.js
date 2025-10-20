import { test } from "@playwright/test";

test.describe("@advanced TestGroup", () => {
  //create beforeEach hook to navigate to "https://practice.cydeo.com"
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com");
  });
  test("Check(): checks the radio button and check boxes if they haven't been checked yet", async ({
    page,
  }) => {
    //let checkboxesLink = page.locator("text=Checkboxes");
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    let checkbox1 = page.locator("#box1");
    await checkbox1.check();
    //await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  test("Uncheck(): checks the radio button and check boxes if they haven't been checked yet", async ({
    page,
  }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    let checkbox2 = page.locator("#box2");
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    await checkbox2.uncheck();
    //await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  test("SelectOpiton(): used for dropdowns boxes with select", async ({
    page,
  }) => {
    let dropdownsLink = page.getByText("Dropdown");
    await dropdownsLink.click();
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    let simpleDropdown = page.locator("//select[@id='dropdown']");
    //await simpleDropdown.selectOption("2"); //select by the value
    //await simpleDropdown.selectOption({ label: "Option 1" }); // select by the text content
    await simpleDropdown.selectOption({ index: 1 }); // select by the index
    //await new Promise((resolve) => setTimeout(resolve, 2000));
  });
});
