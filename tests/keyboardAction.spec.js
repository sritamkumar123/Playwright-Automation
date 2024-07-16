import {test,expect}from "@playwright/test";

test("Keyboard Action",async ({page})=>{

    test.setTimeout(60000);

    await page.goto("https://text-compare.com/");

    await page.type("#inputText1","my name is Sritam Kumar");

    // Contrl + A

    await page.keyboard.press("Control+A");

    // Ctrl + C

    await page.keyboard.press("Control+C")

    //Tab

    await page.keyboard.down("Tab"); // for single key use down or up function
    await page.keyboard.up("Tab");

    //Ctrl + v 

    await page.keyboard.press("Control+V");

    await expect (await page.locator("#inputText2")).toHaveValue("my name is Sritam Kumar"); // this method is used when the element don't have the value in text format means the value is hidden in the element

    await page.waitForTimeout(5000);

})