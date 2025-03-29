const { test, expect } = require('@playwright/test');


export class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder("User ID");
        this.password = page.getByPlaceholder("Password");
        this.signin = page.getByRole('button', { name: "Sign In" });
    }

    async enterUsername(un) {
        await test.step("Enter Username", async () => {
            await this.username.fill(un);
        });
    }

    async enterPassword(pwd) {
        await test.step("Enter Password", async ()=> {
            await this.password.fill(pwd);
        });
    }

    async clickSignin() {
        await test.step("Click Signin Button", async () => {
            await this.signin.click();
        });
    }

}