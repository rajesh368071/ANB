const { expect } = require("@playwright/test");

exports.ContectPage = class ContectPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
        this.page = page;
    }

    async selectAllContact(){
        await this.page.locator("//div[@role='menubar']").click();
        await this.page.locator("//td[text()='All Contacts']").click();
    }

    async selectContact(contactname){
        await this.page.locator("//input[@aria-label='Search']").fill(contactname);
        await this.page.locator("//img[@alt='Search']").click();
        await this.page.locator("//a//span[.='"+contactname+"']").click();
    }


}