const { test, expect } = require('@playwright/test');
const { CarTotalLossInquiry } = require("../test_data/requestdata");
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require('../pages/homePage');
const { ContectPage } = require('../pages/contactPage');
const { CreateServiceRequest } = require('../pages/createServiceRequest');
const { ServiceRequestActions } = require("../pages/servicerequestactionsPage");

test.beforeEach("Launch Application URL",async ({page}) => {
    await page.goto("https://iaczkf-test.fa.ocs.oraclecloud.com/");
});

test("Car total loss inquiry", async ({page, browser}) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const contactpage = new ContectPage(page);
    const createservicerequest = new CreateServiceRequest(page);
    // Branch Officer Work starts
    await loginpage.login("branchofficer", "Welcome@1234");
    await homepage.clickContact();
    await contactpage.selectAllContact();
    await contactpage.selectContact(CarTotalLossInquiry.contactName);

    // PBO/BO Creating Service Request
    await createservicerequest.createServiceRequest(CarTotalLossInquiry.requestname,
        CarTotalLossInquiry.requestfullname,
        CarTotalLossInquiry.accountNumber,
        CarTotalLossInquiry.problemDescription);
    await createservicerequest.enterTraficSerialNumber();
    await createservicerequest.clickSaveandClose();
    const srNum = await createservicerequest.OpenSR(CarTotalLossInquiry.tableSRXpath);
    await createservicerequest.clickValidateInformation();
    await createservicerequest.clickSubmit();
    await page.waitForTimeout(5000);
    // END

    // Auto Lease After Sales Support
    const salesSupportDriver = await browser.newContext();
    const salesSupportPage = await salesSupportDriver.newPage();
    const salesSupportLoginPage = new LoginPage(salesSupportPage);
    const salesSupportHomePage = new HomePage(salesSupportPage);
    const salesSupportSRActions = new ServiceRequestActions(salesSupportPage);

    await salesSupportPage.goto("https://iaczkf-test.fa.ocs.oraclecloud.com/");
    await salesSupportLoginPage.login("autoleaseaftersalesinsurance", "Welcome@1234");
    await salesSupportHomePage.clickServiceRequest();
    await salesSupportSRActions.searchSR(srNum);
    await salesSupportSRActions.openSRfromSearchResult();
    await salesSupportSRActions.clickActions();
    await salesSupportSRActions.clickAssignToMe();
    await salesSupportSRActions.refreshSR();
    await salesSupportSRActions.assignedTo("Auto Lease After Sales Insurance", "Auto Lease After Sales Insurance");
    await salesSupportSRActions.clickActions();
    await salesSupportSRActions.clickMarkDeptWorkasComplete();
    await salesSupportSRActions.clickSubmit();
    //End of Auto Lease After Sales Support


    //Approval Team after sales Support
    const approvalTeamSalesSupportDriver = await browser.newContext();
    const approvalTeamSalesSupportPage = await approvalTeamSalesSupportDriver.newPage();
    const approvalTeamSalesSupportLoginPage = new LoginPage(approvalTeamSalesSupportPage);
    const approvalTeamSalesSupportHomePage = new HomePage(approvalTeamSalesSupportPage);
    const approvalTeamSalesSupportSRActions = new ServiceRequestActions(approvalTeamSalesSupportPage);

    await approvalTeamSalesSupportPage.goto("https://iaczkf-test.fa.ocs.oraclecloud.com/");
    await approvalTeamSalesSupportLoginPage.login("aftersalesinsuranceapprovalteam", "Welcome@1234");
    await approvalTeamSalesSupportHomePage.clickServiceRequest();
    await approvalTeamSalesSupportSRActions.searchSR(srNum);
    await approvalTeamSalesSupportSRActions.openSRfromSearchResult();
    await approvalTeamSalesSupportSRActions.clickActions();
    await approvalTeamSalesSupportSRActions.clickAssignToMe();
    await approvalTeamSalesSupportSRActions.assignedTo("After Sales Insurance Approval Team", "After Sales Insurance Approval  Team");
    await approvalTeamSalesSupportSRActions.clickActions();
    await approvalTeamSalesSupportSRActions.clickMarkDeptWorkasComplete();
    await approvalTeamSalesSupportSRActions.clickActions();
    await approvalTeamSalesSupportSRActions.clickResolveRejectFromActions();
    await approvalTeamSalesSupportSRActions.clickResolveOrReject();
    await approvalTeamSalesSupportSRActions.clickSaveandClose();
    //await approvalTeamSalesSupportPage.waitForTimeout(40000);
    //End of Approval Team after sales Support

});

test.afterEach("Closing browser", async ({page}) => {
    await page.close();
});