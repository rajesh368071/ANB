const { test, expect } = require('@playwright/test');

export class ServiceRequest {

    constructor(page) {
        this.page = page;
        this.createsr = page.getByRole('button', { name: 'Create Service Request' });
        this.hirarchy = page.getByRole('link', { name: 'View in Hierarchy' });
        this.srSearchInput = page.getByLabel('Category Name');
        this.srSearchButton = page.getByRole('button', { name: 'Search All' });

        this.ok = page.getByRole('button', { name: 'OK' });
        this.saveandclose = page.getByRole('button', { name: 'Save and Close' });
        this.submit = page.getByRole('button', { name: 'Submit' });

        this.account = page.getByTitle('Search: Account/Card/Loan');
        this.accountsearch = page.getByRole('link', { name: 'Search...' });
        this.assertRadio = page.locator("(//input[@type='radio'])[1]/..");
        this.problemdescription = page.locator("//p[@class='ck-placeholder']");


        this.amount = page.getByLabel('Amount', { exact: true });
        this.date = page.locator("(//label[.='Date']/../..//input)[1]");
        this.refundDate = page.locator("(//label[.='Refund Date']/../..//input)[1]");
        this.referenceNumber = page.getByLabel('Reference Number', { exact: true });
        this.website = page.getByLabel('Website');
        this.currency = page.getByRole('combobox', { name: 'Currency' });
        this.currencyOpt = (opt) => { return page.getByText(`${opt}`) };


    }

    async selectAccount(){
        await test.step("Select Acount", async () => {
            await this.account.click();
            await this.accountsearch.click();
            await this.assertRadio.click();
            await this.clickOK();
        });
    }

    async clickCreateServiceRequest(){
        await test.step("Click Create Service request Button", async () => {
            await this.createsr.click();
        });
    }

    async clickHirarchy(){
        await test.step("Click Hirarchy Icon", async () => {
            await this.hirarchy.click();
        });
    }

    async enterSRName(srname) {
        await test.step("Enter Service Request Name", async () => {
            await this.srSearchInput.fill(srname);
        });
    }
    
    async clickSearchAll() {
        await test.step("Click Search All", async () => {
            await this.srSearchButton.click();
        });
    }

    async selectSRfromResult(srfullname) {
        await test.step("Select SR from Result", async () => {
            await this.page.getByText(srfullname).click();
        });
    }

    async clickOK() {
        await test.step("Click OK", async () => {
            //await this.page.waitForTimeout(4e3);
            await this.ok.click();
        });
    }

    async clickCreatedSR(nameoftherequest){
        const path = await this.page.locator('((//table[@summary="Service Requests"]//tr)[1]//td)[1]//a');
        const srNo = await path.innerText();
        await path.click();
        return srNo;
    }

    async enterAmount(amount) {
        await test.step("Enter Amount", async () => {
            await this.amount.fill(amount);
        });
    }

    async enterDate(date) {
        await test.step("Enter Date", async () => {
            await this.date.fill(date);
        });
    }

    async enterRefundDate(date) {
        await test.step("Enter Refund Date", async () => {
            await this.refundDate.fill(date);
        });
    }

    async enterReferenceNumber(data) {
        await test.step("Enter Reference Number", async () => {
            await this.referenceNumber.fill(data);
        });
    }

    async enterWebsite(data) {
        await test.step("Enter Website", async () => {
            await this.website.fill(data);
        });
    }

    async selectCurrency(data) {
        await test.step("Select Currency", async () => {
            await this.currency.click();
            await this.currencyOpt(data).click();
        });
    }

    async enterProblemDescription(data) {
        await test.step("Enter Problem Description", async () => {
            await this.problemdescription.click();
            await this.problemdescription.fill(data);
        });
    }

    async clickSaveandClose() {
        await test.step("Click Save and Close", async () => {
            await this.saveandclose.click();
        });
    }

    async clickSubmit() {
        await test.step("Click Save and Close", async () => {
            await this.submit.click();
        });
    }

}