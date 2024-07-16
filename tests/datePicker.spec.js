import {test,expect} from "@playwright/test";

test("Date Picker test",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#datepicker").fill("05/15/2024");

   

    const year= "2020";
    const month="May";
    const date="29";

    while(true){
        const curMonth=await page.locator(".ui-datepicker-month").textContent();
        const curYear= await page.locator(".ui-datepicker-year").textContent();

        if(curMonth==month && curYear==year){
            break;
        }

       // await page.locator(".ui-icon.ui-icon-circle-triangle-e").click();

       await page.locator(".ui-icon.ui-icon-circle-triangle-w").click();  


    }

    const dates= await page.$$(".ui-state-default");

    // for(const dt of dates){

    //     if(await dt.textContent()==date){
    //         await dt.click();
    //         break;
    //     }

    // }

    await page.locator(`//a[@class='ui-state-default'][text()='${date}']`).click(); // parameterise date filed value

    await page.waitForTimeout(5000);

});