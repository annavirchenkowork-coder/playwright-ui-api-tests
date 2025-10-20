import { test } from "@playwright/test";
import { resolve } from "path";

test("@advanced Bypass authentication by embedding the credentials in the URL", async ({
  page,
}) => {
  //First way of passing an authentication - provide credentials in side the URL:
  // https://username:password@domain.com
  await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
  await new Promise((resolve) => setTimeout(resolve, 2000));
});

test("@advanced Bypass authentication by encoding the credentials base64 format", async ({
  page,
}) => {
  let encodedCredentials = Buffer.from("admin:admin").toString("base64");
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });
  await page.goto("https://practice.cydeo.com/basic_auth");
  await new Promise((resolve) => setTimeout(resolve, 2000));
});

//inside a test (use the browser fixture):
test("@advanced Bypass auth using httpCredentials", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: "admin", password: "admin" },
  });
  const page = await context.newPage();
  await page.goto("https://practice.cydeo.com/basic_auth");
  await page.waitForTimeout(2000);
  await context.close();
});
