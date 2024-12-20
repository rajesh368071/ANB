const { expect } = require('@playwright/test');


exports.ServiceRequestActions = class ServiceRequestActions {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;

        //Locators
        this.referencenumber_loc = `Reference Number`;
        this.find_loc = `//img[@title='Find']`;
        this.openSR_loc = `(//table[@summary='Service Requests']//tbody//td)[2]//a`;
        this.summary_loc = `//span[.=': Summary']`;
        this.refresh_loc = `//img[@alt='Refresh']`;
        this.action_loc = `(//a[@role='button' and .='Actions'])[1]`;
        this.assigntome_loc = `//td[.='Assign to Me']`;
    }

    async searchSR(srNum) {
        await this.page.getByPlaceholder(this.referencenumber_loc).fill(srNum);
        await this.page.locator(this.find_loc).click();
    }

    async openSRfromSearchResult(){
        await this.page.locator(this.openSR_loc).click();
        const ele = this.page.locator(this.summary_loc);
        await ele.waitFor({state:"visible", timeout:200000});
    }

    async refreshSR(){
        await this.page.locator(this.refresh_loc).click();
    }

    async assignedTo(assignTo, assignToUsername) {
        const assignValue = this.page.locator("(//label[.='Assigned To']/../../td)[2]//*[@title='"+assignToUsername+"']");
        await assignValue.waitFor({state:"visible", timeout:200000});
        const value = await assignValue.innerText();
        await expect(value).toEqual(assignTo);
    }

    async clickActions(){
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.action_loc).click();
    }

    async clickAssignToMe(){
        await this.page.locator(this.assigntome_loc).click();
    }

    async clickMarkDeptWorkasComplete(){
        await this.page.locator("//td[.='Mark Dept Work Completed']").click();
        const waitforUpdate = this.page.locator("(//td[.='Sub - Status']/following-sibling::*[.='Department Work Completed'])[1]");
        await waitforUpdate.waitFor({state:'visible', timeout:200000});
    }

    async getSubStatus(){
        const workStatus = await this.page.locator("(//td[.='Sub - Status']/..//td)[2]//span").innerText();
        await expect(workStatus).toEqual("Department Work Completed");
    }

    async clickResolveRejectFromActions(){
        await this.page.locator("//td[.='Resolve/Reject...']").click();
    }

    async clickResolveOrReject(){
        await this.page.locator("//button[.='Resolve/Reject']").click();
        const checkResolve = this.page.locator("(//td[.='Status']/following-sibling::*[.='Resolved'])[1]");
        await checkResolve.waitFor({state:"visible", timeout:200000});
    }

    async clickSave() {
        await this.page.locator("//button[@title='Save']").click();
    }

    async clickSaveandClose(){
        await this.page.locator("//button[.='Save and Close']").click();
        const checkPage = this.page.locator("(//td[.='Status']/following-sibling::*[.='Resolved'])[1]");
        await checkPage.waitFor({state:"hidden", timeout:200000});
    }

    async clickSubmit(){
        await this.page.locator("//button[.='Submit']").click();
        const waitForSubmit = this.page.locator("//h1[.='Service Requests']");
        await waitForSubmit.waitFor({state:"visible", timeout:200000});
    }

    async resolveServiceRequest(srNum, ){
        await this.searchSR(srNum);
        await this.openSRfromSearchResult();
        await this.refreshSR();
        //await this.page.waitForTimeout(6000);
        await this.clickSave();
        //await this.page.waitForTimeout(9000);
        await this.assignedTo();
        //await this.page.waitForTimeout(6000);
        await this.clickActions();
        //await this.page.waitForTimeout(6000);
        await this.clickMarkDeptWorkasComplete();
        //await this.page.waitForTimeout(6000);
        await this.getSubStatus();
        //await this.page.waitForTimeout(6000);
        await this.clickActions();
        //await this.page.waitForTimeout(6000);
        await this.clickResolveRejectFromActions();
        //await this.page.waitForTimeout(9000);
        await this.clickResolveOrReject();
        //await this.page.waitForTimeout(9000);
    }

    async submitServiceRequest() {
        await this.searchSR(srNum);
        await this.openSRfromSearchResult();
        await this.refreshSR();
        await this.clickSave();
        await this.assignedTo();
        await this.clickActions();
        await this.clickMarkDeptWorkasComplete();
        await this.clickSubmit();
    }

    //clearance Letter

    async selectCustomerWillingness() {
        await this.page.locator("(//td/label[.='Customer Willingness']/../../td)[2]//input[@role='combobox']").click();
        await this.page.locator("//li[.='No']").click();
    }

    async selectRetentionReason(){
        await this.page.locator("(//td/label[.='Retention Reason']/../..//td)[2]//input[@role='combobox']").click();
        await this.page.locator("//li[.='Pay off']").click();
    }



}