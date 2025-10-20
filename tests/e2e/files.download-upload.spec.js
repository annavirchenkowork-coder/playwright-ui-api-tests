import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const downloadsDir = path.resolve("tests/assets/downloads");
const uploadFile = path.resolve("tests/assets/uploads/TestUpload.txt");

test("@smoke file download saves to assets/downloads", async ({ page }) => {

  fs.mkdirSync(downloadsDir, { recursive: true });

  await page.goto("https://practice.cydeo.com/download");


  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "CoverLetter.pdf" }).click(),
  ]);

  const targetPath = path.join(downloadsDir, download.suggestedFilename());
  await download.saveAs(targetPath);

  expect(fs.existsSync(targetPath)).toBe(true);
});

test("@smoke file upload shows success and filename", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/upload");


  await page.locator("#file-upload").setInputFiles(uploadFile);
  await page.getByRole("button", { name: "Upload" }).click();

  await expect(
    page.getByRole("heading", { name: "File Uploaded!" })
  ).toBeVisible();
  await expect(page.locator("#uploaded-files")).toHaveText("TestUpload.txt");
});
