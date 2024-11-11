const { expect } = require("@playwright/test");

exports.CreateServiceRequest = class CreateServiceRequest {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page){
        this.page = page;
    }

    async clickServiceRequestTab() {
        await this.page.locator("//div[contains(text(),'Service Requests')]").click();
    }

    async clickCreateServiceRequest() {
        await this.page.getByText("Create Service Request").click();
    }

    async clickHierarchy() {
        await this.page.locator("//img[@alt='View in Hierarchy']").click();
    }

    async enterRequestName(requestname) {
        await this.page.locator("(//input)[21]").fill(requestname);
    }

    async clickSearchAll() {
        await this.page.locator("//a[.='Search All']").click();
    }

    async clickSelectRequestSearchResult(fullrequesthierarchy) {
        await this.page.getByText(fullrequesthierarchy).click();
    }

    async clickOK(){
        await this.page.locator("//button[@accesskey='K']").click();
    }

    async enterLoanApplicationNumber(loanapplicationnumber) {
        await this.page.locator("(//td//label[contains(.,'Loan Application Number')]/../../td)[2]/input").fill(loanapplicationnumber);
    }

    async selectLoanRequestStatus(loanrequeststatus) {
        await this.page.locator("((//td//label[contains(.,'Loan request status')]/../../td)[2]//input)[1]").click();
        await this.page.locator("//li[.='"+loanrequeststatus+"']").click();
    }

    async enterProblemDescription(problemdescription) {
        await this.page.locator("//p[@class='ck-placeholder']").click();
        await this.page.locator("//p[@class='ck-placeholder']").fill(problemdescription);
    }

    async enterAccountLoanCardNumber(accountnumber){
        await this.page.locator("//input[@aria-label='Account/Card/Loan Number']").fill(accountnumber);
    }

    async clickSaveandClose(){
        await this.page.locator("//button[.='Save and Close']").click();
    }

    async OpenSR(nameoftherequest){
        const path = await this.page.locator("(//td[.='"+nameoftherequest+"']//..//td)[1]//a");
        const srNo = await path.innerText();
        await path.click();
        return srNo;
    }

    async clickSubmit(){
        await this.page.locator("//button[.='Submit']").click();
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
    async selectBuyerBank(){
        await this.page.locator("(//td/label[.='Buyer/Acquired Bank']/../..//td)[2]//input[@role='combobox']").click();
        await this.page.locator("(//li[text()='Al Rajhi Bank'])[2]").click();
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
        await this.page.locator("((//td//label[contains(.,'Accidented')]/../../td)[2]//input)[1]").click();
        await this.page.locator("//ul[@aria-label='Accidented']//li[.='"+flag+"']").click();
    }

    async selectCustomer(option) {
        await this.page.locator("((//td//label[.='Customer']/../../td)[2]//input)[1]").click();
        await this.page.locator("//ul[@aria-label='Customer']//li[.='"+option+"']").click();
    }
 
}