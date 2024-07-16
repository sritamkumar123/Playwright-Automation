exports.Landingpage =

class Landingpage {

    constructor(page){
        this.page=page;
        this.loginButton= page.getByRole("button",{name:"Log In"});
        this.menuitem= page.getByRole("menuitem");
        this.logoutbtn=page.getByText("Log Out");
        this.viewAll= page.getByRole("link",{name:"View All"}).first();
        this.targetElement = page.getByText('NexGard® (afoxolaner)').first();
        this.petWeight= page.locator('button').filter({ hasText: 'Select pet weight:' });
        this.petLbs=page.getByLabel('-10Lbs').getByText('-10Lbs');
        this.petPack= page.getByRole('button', { name: '6 Pack' });
        this.addtocartBtn=page.getByRole('button', { name: 'Add to Bag' });

    }

    async gotoLandingPage(url){

       await  this.page.goto(url);
    }

    async clickOnLoginBtn(){
        await this.loginButton.click();
    }

    async logoutAction(){
        await this.menuitem.click();
        await this.logoutbtn.click();
    }

    async addtocartAction(){
        await this.viewAll.click();
        await this.targetElement.click();
        await this.petWeight.click();
        await this.petLbs.click();
        await this.petPack.click();
        await this.addtocartBtn.click();
    }

}