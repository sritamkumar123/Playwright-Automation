import{test,expect} from "@playwright/test";

test.describe("Grouping the tests",()=>{
    test.use({
       // baseURL: process.env.PET_BASE_URL,
    })

    test("Login and logout test",async ({page})=>{

        await page.goto("https://pet-cure-web-qa.green-apex.com/home");
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole("textbox",{name:"Enter your Email"}).fill("samplemail111@yopmail.com");
        await page.getByRole("textbox",{name:"Enter your Password"}).fill("Test@1234");
        await page.getByRole("button",{name:"Log In"}).click();
        await page.waitForTimeout(5000);
        await expect(page.getByRole("menuitem")).toBeVisible();
        // await page.getByRole('menuitem').click();
        // await page.getByRole('link', { name: 'My Profile' }).click();
        await page.waitForTimeout(5000);
        await page.getByText("Log Out");
        

    })
})