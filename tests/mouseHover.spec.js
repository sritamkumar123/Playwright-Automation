import {test,expect} from "@playwright/test";

test("Mouse hover action",async ({page})=>{

    await page.goto("https://www.globalsqa.com/demo-site/");

    const element1= await page.locator("//a[@class='no_border'][text()='Free Ebooks']");

    const element2= await page.locator("#menu-item-7132");

    await element1.hover();
    await element2.click();

    await page.waitForTimeout(5000);

})