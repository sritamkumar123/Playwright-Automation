import{test,expect,chromium} from "@playwright/test";

test("Handle multiple pages",async ()=>{

    const browser = await chromium.launch(); // lunch browser

    const context = await browser.newContext(); //cretae context object

    const page = await context.newPage(); // to create multiple page fixture

    const page1 = await context.newPage(); //to create new page

    await page.goto("https://pet-cure-web-qa.green-apex.com/home");

    await page1.goto("https://pet-cure-api-qa.green-apex.com/admin/login");

})

test.only("Navigate to multiple pages",async()=>{


    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page1= await context.newPage();

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    console.log(await page1.title());

    const pagePromise=  context.waitForEvent('page'); // create a empty page

    await page1.locator("//a[text()='OrangeHRM, Inc']").click(); // after that link on the link to open in the blank page

    const page2 = await pagePromise;

    console.log(await page2.title());

    await browser.close();
})