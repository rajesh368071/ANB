const { test, expect } = require('@playwright/test');
const path = require('node:path');

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
        this.dateOfDeath = page.locator("(//label[.='Date Of Death']/../..//input)[1]");
        this.date = page.locator("(//label[.='Date']/../..//input)[1]");
        this.refundDate = page.locator("(//label[.='Refund Date']/../..//input)[1]");
        this.referenceNumber = page.getByLabel('Reference Number', { exact: true });
        this.website = page.getByLabel('Website');
        
        this.currency = page.getByRole('combobox', { name: 'Currency' });
        this.currencyOpt = (opt) => { return page.getByText(`${opt}`) };

        this.buyerBank =  page.getByRole('combobox', { name: 'Buyer/Acquired Bank' });
        this.buyerBankOpt = (opt) => { return page.locator(`//ul[@aria-label="Buyer/Acquired Bank"]/li[.="${opt}"]`) };

        this.reasonForRequesting = page.getByRole('combobox', { name: 'Reason for Requesting the' });
        this.reasonForRequestingOpt =  (opt) => { return page.getByText(`${opt}`) };

        this.customerWillingness = page.getByRole('combobox', { name: 'Customer Willingness' });
        this.customerWillingnessOpt =  (opt) => { return page.locator(`//ul[@aria-label="Customer Willingness"]/li[.="${opt}"]`); }
        
        this.retentionReason =  page.getByRole('combobox', { name: 'Retention Reason' });
        this.retentionReasonOpt = (opt) => { return page.locator(`//ul[@aria-label="Retention Reason"]/li[.="${opt}"]`) };
        
        this.typeOfSettlment = page.getByRole('combobox', { name: 'Type of Settlement' });
        this.typeOfSettlmentOpt = (opt) => {return page.locator(`//li[.="${opt}"]`); }

        this.attachmentIcon = page.getByRole('link', { name: 'Add Attachment' });
        this.empLetterAddressed = page.getByLabel('Employer the letter addressed');
        this.noOfInstallement = page.getByLabel('Number of Instalments for');
        this.perPaid = page.getByLabel('Percentage Paid');
        


    }

    async selectTypeofSettlment(type) {
        await test.step("Select Type Of Settlment", async () => {
            await this.typeOfSettlment.click();
            await this.typeOfSettlmentOpt(type).click();
        })
    }

    async enterNumberofInstalments(value){
        await test.step("enter Number of installment", async () => {
            await this.noOfInstallement.fill(value);
        })
    }

    async enterPercentagePaid(per){
        await test.step("Enter Percentage Paid", async () => {
            await this.perPaid.fill(per);
        })
    }

    async selectRetentionReason(retentionreason){
        await test.step("Select Retention Reason", async () => {
            await this.retentionReason.click();
            await this.retentionReasonOpt(retentionreason).click();
        });
    }

    async selectCustomerWillingness(customerwillingness){
        await test.step("Select Customer Willingness", async () => {
            await this.customerWillingness.click();
            await this.customerWillingnessOpt(customerwillingness).click();
            if(customerwillingness !== 'Yes'){
                await this.retentionReason.waitFor({state:'visible', timeout:5000 });
            }
        });
    }

    async enterEmployeetheLetterAddressed(empletteraddressed) {
        await test.step("Enter Employee The Letter Address", async () => {
            await this.empLetterAddressed.fill(empletteraddressed);
        });
    }

    async selectReasonforRequesting(reasonforrequesting){
        await test.step("Select Reason for Requestiong Letter", async () => {
            await this.reasonForRequesting.click();
            await this.reasonForRequestingOpt(reasonforrequesting).click();
        });
    }

    async selectBuyerBank(buyerbank){
        await test.step("Select Buyer Bank", async () => {
            await this.buyerBank.click();
            await this.buyerBankOpt(buyerbank).click();
        });
    }

    async uploadFile(filepath){
        await test.step("Attach File", async () => {
            await this.attachmentIcon.click();
            await this.page.waitForTimeout(5e3);
            await this.page.getByLabel('Add Files').setInputFiles(filepath);
            const fileName = path.basename(filepath);
            await this.page.waitForSelector(`(//span[.="${fileName}"])[1]`, { state: 'visible', timeout: 20000 });
            await this.ok.click();
        });
    }

    async enterDateofDeath(dateofDeath){
        await test.step("Select Date of Death", async () => {
            await this.dateOfDeath.fill(dateofDeath);
        });
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