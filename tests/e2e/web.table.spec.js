import { test, expect } from "@playwright/test";

test("@smoke Web Table Practice", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/web-tables");

  let table = page.locator("//table[@class='SampleTable']");

  let rows = await table.locator("//tr").all();

  let columns = await table.locator("//th").all();

  let cells = await table.locator("//td").all();

  expect(rows.length).toBe(9);
  expect(columns.length).toBe(13);
  expect(cells.length).toBe(104);

  for (let cell of cells) {
    console.log(await cell.textContent());
  }

  //create a loop that can print each cell's data of the row excluding the first column and the last column

  for (let row of rows) {
    let rowCells = await row.locator("//td").all();
    if (rowCells.length > 2) {
      for (let i = 1; i < rowCells.length - 1; i++) {
        console.log(await rowCells[i].textContent());
      }
      console.log("-------------------");
    }
  }
});

test("@smoke Web Table Checkbox Practice", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/web-tables");

  let table = page.locator("//table[@class='SampleTable']");

  let checkBoxes = await table.locator("//input[@type='checkbox']").all();

  for (let i = 0; i < checkBoxes.length; i++) {
    await checkBoxes[i].click();
    console.log(`Checkbox ${i + 1} clicked.`);
  }
});
