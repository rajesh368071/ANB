const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
        this.page = page;

        //locators
        this.home_loc = `//a[@title='Home']`;
        this.contact_loc = `Contacts`;
        this.servicerequest_loc = `Service Requests`;
    }

    async clickHome(){
        
    }

    async clickContact(){
        await this.page.locator(this.home_loc).click();
        await this.page.getByText(this.contact_loc).click();
    }

    async clickServiceRequest(){
        await this.page.locator(this.home_loc).click();
        await this.page.getByText(this.servicerequest_loc).click();
    }

}