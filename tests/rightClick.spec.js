import{test,expect} from "@playwright/test";

test("Right click action",async ({page})=>{

    await page.goto("https://cps-check.com/right-button-click-test");

    const button = await page.locator("#clicker");

    await button.click(await {button:'right'});

    await page.waitForTimeout(5000);

});