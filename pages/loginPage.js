const { expect } = require('@playwright/test');


exports.LoginPage = class LoginPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;

        //Locators
        this.userID_loc = `User ID`;
        this.password_loc = `Password`
        this.login_loc = `#btnActive`;
    }

    async enterUsername(username) {
        await this.page.getByPlaceholder(this.userID_loc).fill(username);
    }

    async enterPassword(password){
        await this.page.getByPlaceholder(this.password_loc).fill(password);
    }

    async clickLogin(){
        await this.page.locator(this.login_loc).click();
    }

    async login(username, password){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}