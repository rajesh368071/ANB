const { test, expect } = require('@playwright/test');

export class Actions {

    constructor(page) {
        this.page = page;

        this.ok = page.getByRole('button', { name: 'OK' });
        this.saveandclose = page.getByRole('button', { name: 'Save and Close' });
        this.submit = page.getByRole('button', { name: 'Submit' });

        this.inputSR = page.getByPlaceholder('Reference Number');
        this.buttonSR = page.getByRole('button', { name: 'Find' });
        this.srnumber = (data) => { return page.getByRole('link', { name: `${data}` }).first()};
        this.refresh_loc = `//img[@alt='Refresh']`;
        this.resOrRejAction = page.getByText('Resolve/Reject...');
        this.rejorresBtn = page.getByRole('button', { name: 'Resolve/Reject' });

        this.actionBtn = page.getByRole('button', { name: 'Actions' }).first();
        this.markdeptworkcomplete = page.getByText('Mark Dept Work Completed');
        this.submit = page.getByRole('button', { name: 'Submit' });

    }

    async clickActionResOrRej() {
        await test.step("Enter SR Number and Click Search Button", async () => {
            await this.resOrRejAction.click();
        });
    }

    async clickRejectorResolve() {
        await test.step("Enter SR Number and Click Search Button", async () => {
            await this.rejorresBtn.click();
        });
    }

    async refreshSR(){
        await this.page.locator(this.refresh_loc).click();
        await this.page.waitForTimeout(5e3);
    }

    async assignedTo(assignToUsername) {
        const patch = (text) => `//td[@title='Assigned To']/following-sibling::td//*[@title='${text}']`;
        const assign = this.page.locator(patch(assignToUsername));
        while (!(await assign.isVisible())) {
            await this.refreshSR();
        }
    }

    async assignedToText(assignToUsername){
        const patch = (text) => `//td[@title='Assigned To']/following-sibling::td//input[@value='${text}']`;
        const assign = this.page.locator(patch(assignToUsername));
        while (!(await assign.isVisible())) {
            await this.refreshSR();
        }
    }

    async searchSRNumber(data) {
        await test.step("Enter SR Number and Click Search Button", async () => {
            await this.inputSR.fill(data);
            await this.buttonSR.click();
            await this.page.waitForTimeout(6e3);
        });
    }

    async clickSRNumberfromResult(data) {
        await test.step("Click SR from Search Result", async () => {
            
            await this.srnumber(data).click();
        });
    }

    async clickAction() {
        await test.step("Click SR from Search Result", async () => {
            await this.page.waitForSelector("(//div[.='Messages'])[3]", {timeout:10000, state:'visible'});
            await this.actionBtn.click();
        });
    }

    async clickMarkDeptWorkComplete() {
        await test.step("Click SR from Search Result", async () => {
            await this.markdeptworkcomplete.click();
            await this.page.waitForSelector("(//label[.='Sub - Status'])[1]/../../td[2]//span[.='Department Work Completed']", {timeout: 10000, state: 'visible'});
        });
    }

    async clickSubmit() {
        await test.step("Click SR from Search Result", async () => {
            await this.submit.click();
            await this.page.waitForSelector("//h1[.='Service Requests']", {timeout: 10000, state: 'visible'});
        });
    }

}