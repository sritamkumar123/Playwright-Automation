import{expect} from "@playwright/test";

exports.Addtocartpage=

class Addtocartpage{

    constructor(page){
        this.page=page;
        this.addTocartIcon= page.locator('.relative > .group');
        this.elementExist=page.getByText('NexGard® (afoxolaner)').nth(1);
        this.removeFromCart=page.locator('div:nth-child(2) > div:nth-child(2) > div > .cursor-pointer > svg > path');
    
    }

    async checkFromcartAction(){
       await this.addTocartIcon.click();
       await expect(this.elementExist).toBeVisible();
    }

    async removeFromCartAction(){
       await this.removeFromCart.click();
    }

}