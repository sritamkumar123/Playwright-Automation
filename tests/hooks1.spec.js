import{test,expect} from "@playwright/test";

let page; // global variable and can be accessed in every test function

test.beforeAll(async ({browser})=>{

    page = await browser.newPage();

    await page.goto("https://pet-cure-web-qa.green-apex.com/home");

    await page.getByRole("button",{name:'Log In'}).click();

    await page.getByRole("textbox",{name:"Enter your Email"}).fill("qa@yopmail.com");

    await page.getByRole("textbox",{name:"Enter your Password"}).fill("Test@123");

    await page.getByRole("button",{name:"Log In"}).click();

   

       // const itemList = await page.$$("//li[contains(@id,'splide24-slide')]//p");

//    // console.log(await itemList.textContent());

//     for(const item of itemList){

//         console.log(await item.textContent());

//     }



   

    // const texts= ['Heartgard Plus','Comfortis'];

    // for( const text of texts){

    //     await page.waitForSelector(`text=${text}`,{state:"visible"});

    //    const check= await page.getByLabel(`${text}`,{exact:true}).first().isVisible();
       
    //    console.log(check);

    //    if(!check){
    //     throw new Error('Sritam testing pass');
    //    }

    //     console.log(text);
    // }
    



});

test.afterAll(async()=>{

    await page.getByRole('menuitem').click();

    await page.getByText('Log Out').click();

});

test("Hook test1",async()=>{

    await page.locator('#splide04-slide03').getByRole('img', { name: 'product' }).click();

    await expect( page.getByText('BRAVECTO (fluralaner topical')).toBeVisible();


});

test("Hook test2",async()=>{

    await page.goto("https://pet-cure-web-qa.green-apex.com/home");

    await page.getByRole('link', { name: 'View All' }).first().click();

    await page.waitForTimeout(3000);

    await page.getByText('Pure and Natural Pet Ear Cleansing System').click();

    await page.getByRole("button",{name:"Add to Bag"}).click();

    await page.locator('.relative > .group').click();

   await  expect( page.getByText('Pure and Natural Pet Ear Cleansing System', { exact: true })).toBeVisible();

   await page.locator('div').filter({ hasText: /^Pure and Natural Pet Ear Cleansing System$/ }).locator('path').click();

   await page.waitForTimeout(3000);  // make changes on the config file
                                    //fullyParallel:false
                                    //workers:process:env.CI? 1

});