import { test, firefox, expect } from "@playwright/test";

test("Context Fixture Example @fixture", async ({ context }) => {
  let page1 = await context.newPage();
  let page2 = await context.newPage();
  let page3 = await context.newPage();
  let page4 = await context.newPage();

  await page1.bringToFront();
  await page1.goto("https://www.linkedin.com/");
  await page1.waitForTimeout(1000);

  await page2.bringToFront();
  await page2.goto("https://www.facebook.com/");
  await page2.waitForTimeout(1000);

  await page3.bringToFront();
  await page3.goto("https://www.youtube.com/");
  await page3.waitForTimeout(1000);

  await page4.bringToFront();
  await page4.goto("https://www.instagram.com/");
  await page4.waitForTimeout(1000);
});

test("Browser Fixture Example @fixture", async ({ browser }) => {
  let context1 = await browser.newContext();
  let page1 = await context1.newPage();
  let page2 = await context1.newPage();

  let context2 = await browser.newContext();
  let page3 = await context2.newPage();
  let page4 = await context2.newPage();

  await page4.waitForTimeout(2000);

  await page1.bringToFront();
  await page1.goto("https://www.linkedin.com/");
  await page1.waitForTimeout(1000);

  await page2.bringToFront();
  await page2.goto("https://www.facebook.com/");
  await page2.waitForTimeout(1000);

  await page3.bringToFront();
  await page3.goto("https://www.youtube.com/");
  await page3.waitForTimeout(1000);

  await page4.bringToFront();
  await page4.goto("https://www.instagram.com/");
  await page4.waitForTimeout(1000);
});

test("Custom Context and Browser Configuration", async ({}) => {
let browser = await firefox.launch();
let context = await browser.newContext();
let page = await context.newPage();

await page.goto("https://www.linkedin.com/");
await page.waitForTimeout(1000);

await browser.close();
});
// TASK: Send get request and verify the status code, conten-type and Json body
//     step1: The baseURL is set to http://example.com/
//     step2: user sends GET request  to /exampleEndPoint
//     step3: verify status code is 200
//     step4: verify content type is application/json
//     step4: verify the total json object is 1
//     step5: verify firstName is Josh
//     step5: verify lastName is Jeremy
test("API request @api", async ({ request }) => {
    //send a get request to /exampleEndPoint.
    let response = await request.get('/exampleEndPoint');

    //assert that the status code is 200.
    expect(response.status()).toBe(200);

    //assert that the response body is a JSON object.
     expect(response.json()).toBeTruthy();

    //assert that the response headers contain a "Content-Type" header with value "application/json".
    expect(response.headers()).get("content-type").toBe("application/json");
    //OR
    expect(response.headers()).toHaveProperty("content-type", "application/json");
    //OR
    expect(response.headers()["content-type"]).toBe("application/json");

    //verify that the total json object is 1
    let json = await response.json();
    expect(json.length).toBe(1);

    //verify that the first name is "Josh"
     expect(json[0].firstName).toBe("Josh");

     //verify lastName is Jeremy
     expect(json[0].lastName).toBe("Jeremy");
});

test("POST request test @api", async ({ request }) => {
    const postData = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "age": 30
    };

    const response = await request.post('/api/post', {
        data: postData
    });

    // Assuming the API returns a 201 status for a successful creation
    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    // Assuming the API returns a success message
    expect(responseBody.message).toBe("Created");

    expect(responseBody.data.firstName).toBe("John");
    expect(responseBody.data.lastName).toBe("Doe");
    expect(responseBody.data.email).toBe("johndoe@example.com");
    expect(responseBody.data.age).toBe(30);
});

//create delete request test
test("DELETE request test @api", async ({ request }) => {
     const deleteData = {
       firstName: "John",
       lastName: "Doe",
       email: "johndoe@example.com",
       age: 30,
     };
     const response = await request.post('/api/post', {
       data: deleteData
     });
    
    // Assuming the API returns a 200 status for a successful deletion
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assuming the API returns a success message
    expect(responseBody.message).toBe("Deleted");
});

//create put request test
test("PUT request test @api", async ({ request }) => {
    const putData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        age: 30,
    };

    const response = await request.put('/api/put', {
        data: putData
    });

    // Assuming the API returns a 200 status for a successful update
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assuming the API returns a success message
    expect(responseBody.message).toBe("Updated");

    expect(responseBody.data.firstName).toBe("John");
    expect(responseBody.data.lastName).toBe("Doe");
    expect(responseBody.data.email).toBe("johndoe@example.com");
    expect(responseBody.data.age).toBe(30);
});






