const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {ServiceRequest} = require("../../pages/serviceRequest");
const {Actions} = require("../../pages/actionPage");
const cred = require("../../test_data/Credentials.config");
const { deleteRequest } = require("../api/deleteReq");
const dataRead = require("../../utils/excelReader");

const data = dataRead.sheetDate("clearanceletter")[1];
const assignToNames = dataRead.sheetDate("assignToNames");

let requestNumber;

test.afterEach("close the browser", async ({page}) => {
  await deleteRequest(requestNumber);
  //await page.close();
});

test('Clearance Letter of Two Salary with Obligation (No Available Active Card)', async ({ page }, testInfo) => {
  test.setTimeout(0);
  test.slow();
  //await page.pause();

  await page.goto(cred.url);

  const login = new LoginPage(page);
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const servicerequest = new ServiceRequest(page);
  const action = new Actions(page);
  
  await login.enterUsername(cred.rm.username);
  await login.enterPassword(cred.rm.password);
  await login.clickSignin();
  await home.clickHome();
  await home.enterSearch(data.ContactName);
  await home.clickSearch();
  await home.clickContactName();
  await contact.clickServiceRequest();
  await servicerequest.clickCreateServiceRequest();
  await servicerequest.clickHirarchy();
  await servicerequest.enterSRName(data.RequestName);
  await servicerequest.clickSearchAll();
  await servicerequest.selectSRfromResult(data.RequestFullName);
  await servicerequest.clickOK();
  
  await servicerequest.selectAccount();
  await servicerequest.selectBuyerBank("Riyadh Bank");
  await servicerequest.enterEmployeetheLetterAddressed("Address");
  await servicerequest.selectReasonforRequesting("Early settlement to get No obligation letter");
  await servicerequest.enterProblemDescription("Automation Test");
  await servicerequest.clickSaveandClose();
  const srnumber = await servicerequest.clickCreatedSR(data.RequestName);
  requestNumber = srnumber;
  await servicerequest.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
  
  await login.enterUsername(cred.retentionloanagent.username);
  await login.enterPassword(cred.retentionloanagent.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[7].assignTo);
  await servicerequest.selectCustomerWillingness("No");
  await servicerequest.selectRetentionReason("Pay off");
  await action.clickSave();
  await page.waitForTimeout(3e3);
  await action.clickAction();
  await page.waitForTimeout(5e3);
  await action.clickMarkDeptWorkComplete();
  await action.clickSave();
  await page.waitForTimeout(5e3);
  await action.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername(cred.retentionloansupervisor.username);
  await login.enterPassword(cred.retentionloansupervisor.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[8].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSave();
  await page.waitForTimeout(5e3);
  await action.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername(cred.issuingagent.username);
  await login.enterPassword(cred.issuingagent.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[5].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSave();
  await page.waitForTimeout(5e3);
  await action.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername(cred.issuingsupervisor.username);
  await login.enterPassword(cred.issuingsupervisor.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[6].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSave();
  await action.clickSubmit();
  await page.reload();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await expect(page.locator("(//td[.='Status']/../td)[2]//span[.='Resolved']")).toBeVisible();
  await servicerequest.clickSaveandClose();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

});
