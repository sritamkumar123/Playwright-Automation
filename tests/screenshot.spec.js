import {test,expect} from "@playwright/test";

test("screenshot test",async ({page})=>{

    await page.goto("https://pet-cure-web-qa.green-apex.com/home")

   // await page.screenshot({path:"tests/screenshots/"+Date.now()+"screenshot.png" });

   // await page.screenshot({path: "tests/screenshots/"+Date.now()+"fullscreenshot.png",fullPage: true});

    await page.getByRole("img",{name: "hero"}).screenshot({path:"tests/screenshots/"+Date.now()+"elementscreenshot.png"});

    // configure the config file to capture screenshot after every test execution

    // **under test-results the screenshot are added in vscode** else from html reports we can get the screenshot**

    
})