import{test,expect} from "@playwright/test";

test("Drag drop action",async ({page})=>{

    test.setTimeout(50000);

    await page.goto("http://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-2.html");

    // const target= await page.locator("(//div[@class='destinationBox'])[7]");

    // const source= await page.locator("#a12");

    const source1= await page.locator("#box1");

    const target1= await page.locator("#dropBox");

    await source1.hover();
    await page.mouse.down();

    await page.waitForTimeout(3000);

    await target1.hover();
    await page.mouse.up();

     await page.waitForTimeout(3000);

     //await source1.dragTo(target1);

   // await page.waitForTimeout(5000);



    await expect(await page.locator("//div[@id='dropContent2']/div[1]")).toHaveText("CAT");

    const target2 = await page.locator("#leftColumn");

    //const source2= await page.locator("#box1")

    await source1.dragTo(await target2);


    await page.waitForTimeout(3000);

});