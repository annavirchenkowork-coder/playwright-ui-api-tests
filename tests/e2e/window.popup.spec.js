import { test, expect } from "@playwright/test";

test("@regression Window pop-up practice", async ({ page }) => {
  //create event listener for monitoring window pop-ups

  let promisedNewPageEvent = page.waitForEvent("popup");

  // navigate to a webpage that opens a window pop-up
  await page.goto("https://practice.cydeo.com/windows");

  await page.click("text='Click Here'"); //triggers the window pop-up

  let newPage = await promisedNewPageEvent; //await for the new page to be opened

  await expect(newPage).toHaveTitle("New Window"); //verify the title of the new page
  await expect(page).toHaveTitle("Windows"); //verify that the original page title is not displayed

  await page.bringToFront(); //bring the original page to the front
  let firstWindowElement = page.getByText("Opening a new window");
  await expect(firstWindowElement).toBeVisible(); //verify that the original page element is still visible

  await newPage.bringToFront(); //bring the new page to the front
  let secondWindowElement = newPage.getByText("New Window");
  await expect(secondWindowElement).toBeVisible(); //verify that the new page element is visible
});
