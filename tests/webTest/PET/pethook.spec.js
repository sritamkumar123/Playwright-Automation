import { test, expect } from '@playwright/test';

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://pet-cure-web-qa.green-apex.com/home');
  await page.getByRole("button",{name:"Log In"}).click();
  await page.getByRole("textbox",{name: "Enter your Email"}).fill("samplemail111@yopmail.com");
  await page.getByRole("textbox",{name: "Enter your Password"}).fill("Test@1234");
  await page.getByRole("button",{name:"Log In"}).click();

  console.log("Page is loaded from beforeAll");
});
test.beforeEach(async ()=>{

    console.log("before each executed added");
});
test.afterEach(async()=>{

    console.log("after each executed");
})

test("Loading landing page",async ({})=>{

    await page.goto('https://pet-cure-web-qa.green-apex.com/home');
    console.log("test is executed");
})

test.afterAll(async()=>{

    await page.getByRole('menuitem').click();

    await page.getByText('Log Out').click();
    console.log("after all executed");

});