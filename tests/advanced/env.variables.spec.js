import { test } from "@playwright/test";

test("@advanced @env-test Testing environment variables", async ({ page }) => {
  console.log(`Username is: ${process.env.PRACTICE_USERNAME}`);
  console.log(`Password is: ${process.env.PRACTICE_PASSWORD}`);
});

test("@advanced Bypass authentication by encoding the credentials base64 format", async ({
  page,
}) => {
  let encodedCredentials = Buffer.from(
    `${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`
  ).toString("base64");
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });
  await page.goto("https://practice.cydeo.com/basic_auth");
  await new Promise((resolve) => setTimeout(resolve, 2000));
});
