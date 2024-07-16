import{test,expect} from "@playwright/test";

test("trace viewer test",async ({page})=>{

    await page.goto("https://pet-cure-web-qa.green-apex.com/home");

    await page.getByRole("button",{name:'Log In'}).click();

    await page.getByRole("textbox",{name:"Enter your Email"}).fill("qa@yopmail.com");

    await page.getByRole("textbox",{name:"Enter your Password"}).fill("Test@123");

    await page.getByRole("button",{name:"Log In"}).click();

    await page.locator('#splide04-slide03').getByRole('img', { name: 'product' }).click();

    await expect( page.getByText('BRAVECTO (fluralaner topical')).toBeVisible();

    await page.getByRole('menuitem').click();

    await page.getByText('Log Out').click();

    //test viewer is used to log each activites

    // in cofig file under use add configurations as 
    //trace:'on' / 'retain-on-failure'


    // get the trace viwer on the generated report or using command we can extract the zip file from the test-results

    // use below command for open the zip file from the terminal
   // npx playwright show-trace test-results\traceViewer-trace-viewer-test-chromium\trace.zip 
    
})