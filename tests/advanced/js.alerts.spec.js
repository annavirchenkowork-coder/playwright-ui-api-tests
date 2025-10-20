import { test } from "@playwright/test";

test.describe("@advanced TestGroup", () => {
  //navigate to the "https://practice.cydeo.com/javascript_alerts" page
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/javascript_alerts");
  });

  //test cases for JavaScript Alerts
  test("@advanced Regular Alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert Text:: ${alert.message()}`);
      await page.waitForTimeout(1000);
      await alert.accept();
    });

    let clickForJSAlertButton = page.locator("//button[@onclick='jsAlert()']");
    await clickForJSAlertButton.click();

    await page.waitForTimeout(1000);
  });

  test("@advanced Confirmation Alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert Text:: ${alert.message()}`);
      await page.waitForTimeout(1000);
      await alert.dismiss();
    });

    let clickForJSConfirmAlertButton = page.locator(
      "//button[contains(text(), 'JS Confirm')]"
    );
    await clickForJSConfirmAlertButton.click();
    await page.waitForTimeout(1000);
  });

  test("@advanced Prompt Alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert Text:: ${alert.message()}`);
      await page.waitForTimeout(1000);
      await alert.accept("Prompt Input");
    });

    let ckickForJSPromptAlertButton = page.locator(
      "//button[@onclick='jsPrompt()']"
    );
    await ckickForJSPromptAlertButton.click();
    await page.waitForTimeout(1000);
  });
});
