const { expect } = require('@playwright/test');


exports.LoginPage = class LoginPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
    }

    async enterUsername(username) {
        await this.page.getByPlaceholder('User ID').fill(username);
    }

    async enterPassword(password){
        await this.page.getByPlaceholder("Password").fill(password);
    }

    async clickLogin(){
        await this.page.locator("#btnActive").click();
    }

    async login(username, password){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}