const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {ServiceRequest} = require("../../pages/serviceRequest");
const {Actions} = require("../../pages/actionPage");
const cred = require("../../test_data/Credentials.config");
const { deleteRequest } = require("../api/deleteReq");
const dataRead = require("../../utils/excelReader");

const data = dataRead.sheetDate("opofdp")[0];
const assignToNames = dataRead.sheetDate("assignToNames");

let requestNumber;

test.afterEach("close the browser", async ({page}) => {
  await deleteRequest(requestNumber);
  //await page.close();
});

test('Obligation Paid Off Letter For Deceased Person End to End Positive Flow', async ({ page }, testInfo) => {
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
  await servicerequest.enterDateofDeath('02/04/2025');
  const filePath = "../ANB/test_data/testFileData/Dummy.txt";
  await servicerequest.uploadFile(filePath);
  await servicerequest.enterProblemDescription("Automation Test");
  await servicerequest.clickSaveandClose();
  const srnumber = await servicerequest.clickCreatedSR(data.RequestName);
  requestNumber = srnumber;
  await servicerequest.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
  
  await login.enterUsername(cred.deceasedagent.username);
  await login.enterPassword(cred.deceasedagent.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[4].assignTo);
  await action.clickAction();
  await page.waitForTimeout(5e3);
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
  await action.clickAction();
  await action.clickActionResOrRej();
  await action.clickRejectorResolve();
  await expect(page.locator("(//td[.='Status']/../td)[2]//span[.='Resolved']")).toBeVisible();
  await servicerequest.clickSaveandClose();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

});
