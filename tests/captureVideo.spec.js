import {test,expect} from "@playwright/test";

test("capture video",async({page})=>{

    await page.goto("https://pet-cure-web-qa.green-apex.com/home");

    await page.getByRole("button",{name:'Log In'}).click();

    await page.getByRole("textbox",{name:"Enter your Email"}).fill("qa@yopmail.com");

    await page.getByRole("textbox",{name:"Enter your Password"}).fill("Test@123");

    await page.getByRole("button",{name:"Log In"}).click();

    await page.locator('#splide04-slide03').getByRole('img', { name: 'product' }).click();

    await expect( page.getByText('BRAVECTO (fluralaner topical')).toBeVisible();

    await page.getByRole('menuitem').click();

    await page.getByText('Log Out').click();

    // on config file under use add following configurations 

    //screenshot: 'only-on-failure' 

    //video: 'retain-on-failure'

    //saved in the report and in the test-result folder as well

})