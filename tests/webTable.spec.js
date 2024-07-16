import {test,expect} from "@playwright/test";

test("WebTable handle",async({page})=>{

    test.setTimeout(50000);

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = await page.locator("table[name='BookTable']");

    const headers= await table.locator("tbody tr th");

    console.log("Total number of headers", await headers.count());

    const rows= await table.locator("tbody tr");

    console.log("Total  number of rows", await rows.count());

    expect(await headers.count()).toBe(4);
    expect(await rows.count()).toBe(7);

    const table1= await page.locator("#productTable");

    const rows1 = await table1.locator("tbody tr");

    const targetRow = await rows1.filter({
        has: page.locator("td"),
        hasText:"Product 3"
    })

    await targetRow.locator("input").check();
   // preparing reusable component 

   await selectProduct(rows1,page,"Product 1");

   await selectProduct(rows1,page,"Product 2");

   await selectProduct(rows1,page,"Product 4");

   await selectProduct(rows1,page,"Product 5");

   for(let i=0; i<await rows1.count(); i++){

    const row = await rows1.nth(i); //locator
    const tds= await row.locator("td"); //locator

    for(let j=0; j< await tds.count()-1 ; j++){
        console.log( await tds.nth(j).textContent());
    }

}


    //printing values from all the pages 

    const pages= await page.locator(".pagination li a");
    console.log("Total number og pages",pages.count());

    for(let p=0; p< await pages.count();p++){

        if(p>0){

            await pages.nth(p).click();

        }

        for(let i=0; i<await rows1.count(); i++){

            const row = await rows1.nth(i); //locator
            const tds= await row.locator("td"); //locator
        
            for(let j=0; j< await tds.count()-1 ; j++){
                console.log( await tds.nth(j).textContent());
            }
        
        
        }

        await page.waitForTimeout(5000);

    }

   await page.waitForTimeout(5000);

})

// reusable function

async function selectProduct(row,page1,text){

    const targetRow1 = await row.filter({
        has: page1.locator("td"),
        hasText:text
    })

    await targetRow1.locator("input").check();

}

