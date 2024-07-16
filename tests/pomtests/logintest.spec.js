import {test,expect} from "@playwright/test";

import { LoginPage } from "../POM/loginpage";

import { Landingpage } from "../POM/landingpage";

import { Addtocartpage } from "../POM/cartpage";


test("login test",async ({page})=>{
    const landpage= new Landingpage(page);

    await landpage.gotoLandingPage("https://pet-cure-web-qa.green-apex.com/home");
    await landpage.clickOnLoginBtn();

    const login = new LoginPage(page);
    await login.loginMethod("qa@yopmail.com","Test@123");
    await page.waitForTimeout(3000);
    await landpage.addtocartAction();

    const addtocart= new Addtocartpage(page);

    await addtocart.checkFromcartAction();
    //await page.waitForTimeout(3000);

    //await expect(addtocart.elementExist).toBeVisible();

   await addtocart.removeFromCartAction();

   await landpage.logoutAction();

})