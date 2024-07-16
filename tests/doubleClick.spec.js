import{test,expect} from "@playwright/test";

test("Double click", async ({page})=>{

   await page.goto("https://testautomationpractice.blogspot.com/");

   const copyButton=await page.locator("button[ondblclick='myFunction1()']");

   await copyButton.dblclick();

   await expect(await page.locator("#field2")).toHaveValue("Hello World!");

   await page.waitForTimeout(5000);
})