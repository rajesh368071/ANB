const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
        this.page = page;
    }

    async clickHome(){
        
    }

    async clickContact(){
        await this.page.locator("//a[@title='Home']").click();
        await this.page.getByText("Contacts").click();
    }

    async clickServiceRequest(){
        await this.page.locator("//a[@title='Home']").click();
        await this.page.getByText("Service Requests").click();
    }

}