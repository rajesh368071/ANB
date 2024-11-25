const { expect } = require("@playwright/test");
const { ok } = require("assert");

exports.CreateServiceRequest = class CreateServiceRequest {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
        this.page = page;

        //locator
        this.serviceRequestTab_loc = `//div[contains(text(),'Service Requests')]`;
        this.createServiceRequest_loc = `Create Service Request`;
        this.hierarchy_loc = `//img[@alt='View in Hierarchy']`;
        this.requestName_loc = `(//input)[21]`;
        this.searchAll_loc = `//a[.='Search All']`;
        this.ok_loc = `//button[@accesskey='K']`;
        this.loanapplicationnumber_loc = `(//td//label[contains(.,'Loan Application Number')]/../../td)[2]/input`;
        this.loanrequeststatus_loc = `((//td//label[contains(.,'Loan request status')]/../../td)[2]//input)[1]`;
        this.problemdescription_loc = `//p[@class='ck-placeholder']`;
        this.accountOrCardOrLoanNumber_loc = `//input[@aria-label='Account/Card/Loan Number']`;
        this.saveclose_loc = `//button[.='Save and Close']`;
        this.submit_loc = `//button[.='Submit']`;
        this.buyeracquiredbank_loc = `(//td/label[.='Buyer/Acquired Bank']/../..//td)[2]//input[@role='combobox']`;

        //autolease fields locator
        this.accident = `((//td//label[contains(.,'Accidented')]/../../td)[2]//input)[1]`;

    }

    async clickServiceRequestTab() {
        await this.page.locator(this.serviceRequestTab_loc).click();
    }

    async clickCreateServiceRequest() {
        await this.page.getByText(this.createServiceRequest_loc).click();
    }

    async clickHierarchy() {
        await this.page.locator(this.hierarchy_loc).click();
    }

    async enterRequestName(requestname) {
        await this.page.locator(this.requestName_loc).fill(requestname);
    }

    async clickSearchAll() {
        await this.page.locator(this.searchAll_loc).click();
    }

    async clickSelectRequestSearchResult(fullrequesthierarchy) {
        await this.page.getByText(fullrequesthierarchy).click();
    }

    async clickOK(){
        await this.page.locator(this.ok_loc).click();
    }

    async enterLoanApplicationNumber(loanapplicationnumber) {
        await this.page.locator(this.loanapplicationnumber_loc).fill(loanapplicationnumber);
    }

    async selectLoanRequestStatus(loanrequeststatus) {
        await this.page.locator(this.loanrequeststatus_loc).click();
        await this.page.locator("//li[.='"+loanrequeststatus+"']").click();
    }

    async enterProblemDescription(problemdescription) {
        await this.page.locator(this.problemdescription_loc).click();
        await this.page.locator(this.problemdescription_loc).fill(problemdescription);
    }

    async enterAccountLoanCardNumber(accountnumber){
        await this.page.locator(this.accountOrCardOrLoanNumber_loc).fill(accountnumber);
    }

    async clickSaveandClose(){
        await this.page.locator(this.saveclose_loc).click();
    }

    async OpenSR(nameoftherequest){
        const path = await this.page.locator("(//td[.='"+nameoftherequest+"']//..//td)[1]//a");
        const srNo = await path.innerText();
        await path.click();
        return srNo;
    }

    async clickSubmit(){
        await this.page.locator(this.submit_loc).click();
    }

    async createServiceRequest(requestname, fullrequestname, accountNumber, problemdescription) {
        await this.clickServiceRequestTab();
        await this.clickCreateServiceRequest();
        await this.clickHierarchy();
        await this.enterRequestName(requestname);
        await this.clickSearchAll();
        await this.clickSelectRequestSearchResult(fullrequestname);
        await this.clickOK();
        await this.enterAccountLoanCardNumber(accountNumber);
        await this.enterProblemDescription(problemdescription);
    }

    //clearance Letter Fields
    async selectBuyerBank(bankName){
        await this.page.locator(this.buyeracquiredbank_loc).click();
        await this.page.locator("(//li[text()="+bankName+"])[2]").click();
    }

    async enterAddress(){
        await this.page.locator("(//td/label[.='Employer the letter addressed to']/../..//td)[2]//input").fill("data");
    }

    async selectReason(){
        await this.page.locator("(//td/label[.='Reason for Requesting the letter']/../..//td)[2]//input[@role='combobox']").click();
        await this.page.locator("//li[.='Early settlement to get No obligation letter']").click();
    }

    async enterProcessingBranch(){
        await this.page.locator("(//td/label[.='Processing Branch']/../..//td)[2]//input").fill("Riyadh");
    }

    async enterTraficSerialNumber(){
        await this.page.locator("(//td//label[.='Serial number(Traffic license)']/../..//td)[2]//input").fill("121236524152");
    }

    async clickValidateInformation(){
        await this.page.locator("(//td//label[.='Validate the information is complete and accurate']/../..//td)[2]//label").click();
    }

    async selectFeesPaidBy(feesPaidBy) {
        await this.page.locator("((//td//label[contains(.,'Fees Paid By')]/../../td)[2]//input)[1]").click();
        await this.page.locator("//li[.='"+feesPaidBy+"']").click();
    }

    async selectAccidented(flag) {
        await this.page.locator("").click();
        await this.page.locator("//ul[@aria-label='Accidented']//li[.='"+flag+"']").click();
    }

    async selectCustomer(option) {
        await this.page.locator("((//td//label[.='Customer']/../../td)[2]//input)[1]").click();
        await this.page.locator("//ul[@aria-label='Customer']//li[.='"+option+"']").click();
    }
 
}