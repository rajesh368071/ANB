const { test, expect } = require('@playwright/test');

export class Actions {

    constructor(page) {
        this.page = page;

        this.ok = page.getByRole('button', { name: 'OK' });
        
        this.save = page.getByRole('button', { name: 'Save', exact: true });
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
        this.markdeptworkinprogress = page.getByText('Mark Dept Work In Progress');
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.cancel = page.getByRole('button', { name: 'Cancel' });
        this.discardIssue = page.locator('//button[.="Discard Changes"]/following-sibling::button');

    }

    async clickCancel() {
        await test.step("Click cancel", async () => {
            await this.cancel.click();
        });
    }

    async clickSaveandClose() {
        await test.step("Click Save and Close", async () => {
            await this.saveandclose.click();
        });
    }

    async clickMarkDeptWorkInProgress() {
        await test.step("Click on Mark Dept Work In Progress", async () => {
            await this.markdeptworkinprogress.click();
        });
    }

    async clickSave() {
        await test.step("Click on Mark Dept Work In Progress", async () => {
            await this.save.click();
        });
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
        //while (!(await assign.isVisible())) {
            //await this.refreshSR();
        //}
        for (let attempts = 0; attempts < 5; attempts++) {
            if (await assign.isVisible()) {
                break;
            }
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
            await this.page.waitForSelector("(//div[.='Messages'])[3]", {timeout:20000, state:'visible'});
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
            await this.page.waitForTimeout(4e3);
            if (await this.discardIssue.isVisible()) {
                await this.discardIssue.click();
                await this.clickSaveandClose();
            }
            await this.page.waitForSelector("//h1[.='Service Requests']", {timeout: 10000, state: 'visible'});
        });
    }

}