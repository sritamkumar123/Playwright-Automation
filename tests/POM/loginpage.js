exports.LoginPage =

class LoginPage{

    constructor(page){
        this.page=page; //page is properties/variable //this is always refer to class 
        this.emailFiled= page.getByRole("textbox",{name:"Enter your Email"});
        this.passwordFiled = page.getByRole("textbox",{name:"Enter your Password"});
        this.loginbtn= page.getByRole("button",{name:"log in to us"});

    }

    async loginMethod(email,password){
        await this.emailFiled.fill(email);
        await this.passwordFiled.fill(password);
        await this.loginbtn.click();
    }
}