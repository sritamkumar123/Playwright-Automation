import{test,expect} from "@playwright/test";

let page;

test.beforeAll(async({browser})=>{

page= await browser.newPage();

await page.goto("https://pet-cure-web-qa.green-apex.com/home");

await page.getByRole("button",{name:"Log In"}).click();

await page.getByRole("textbox",{name:"Enter your Email"}).fill("qa@yopmail.com");

await page.getByRole("textbox",{name:"Enter your Password"}).fill("Test@123");

await page.getByRole("button",{name:"Log In"}).click();

await page.waitForTimeout(2000);

})

test.afterAll(async()=>{

    await page.getByRole("menuitem").click();
    await page.getByText("Log Out").click();


})

test("only annotation",async ()=>{

    await page.getByRole("button",{name:"Shop Now"}).click();
    await expect(page.getByRole("heading",{name:"FILTERS"})).toBeVisible();
})

test("Skip annotation",async ({browserName})=>{

    // if(browserName ==="chromiumim"){
    //     test.skip();
    // }

   // test.fixme();

  // test.fail();

//   if(browserName==="firefox"){
//     test.fail();
//   }

test.slow();

    await page.goto('https://pet-cure-web-qa.green-apex.com/home');
    await page.locator("(//div[contains(@class,'lg:min-w-96')])[6]").scrollIntoViewIfNeeded();
    await page.getByRole('group', { name: '2 of 4' }).locator('span').click();
    await page.locator('div:nth-child(4) > a').first().click();
    await page.waitForTimeout(5000);
    await expect.soft(page.locator("//p[normalize-space()='Heartgard Plus']")).toBeVisible();
    await page.locator("(//*[name()='path'])[1438]").click();

})

// .only
// .skip
// conditional skip
// test.fixme() -- normally used when test case have some issue and we don't need to execute that test case
// test.fail() -- when both expected and actual assert fail then only test fail else it will pass
// test.slow() -- increase the timeout limit 3 times
// test.setTimeout(50000) --- to increase timeout of a specific test

