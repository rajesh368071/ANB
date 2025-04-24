const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {ServiceRequest} = require("../../pages/serviceRequest");
const {Actions} = require("../../pages/actionPage");
const cred = require("../../test_data/Credentials.config");
const { deleteRequest } = require("../api/deleteReq");
const dataRead = require("../../utils/excelReader");

const data = dataRead.sheetDate("earlysettlment")[0];
const assignToNames = dataRead.sheetDate("assignToNames");

let requestNumber;

test.afterEach("close the browser", async ({page}) => {
  await deleteRequest(requestNumber);
  await page.close();
});

test('Early Settlment (ANB Customer Yes)', async ({ page }, testInfo) => {
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
  await servicerequest.selectTypeofSettlment("Partial Settlement");
  await servicerequest.enterNumberofInstalments("2");
  await servicerequest.enterAmount("23");
  await servicerequest.enterPercentagePaid("2");
  await servicerequest.enterProblemDescription("Automation Test");
  await servicerequest.clickSaveandClose();
  const srnumber = await servicerequest.clickCreatedSR(data.RequestName);
  requestNumber = srnumber;
  await servicerequest.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername(cred.cadminaftersalesagent.username);
  await login.enterPassword(cred.cadminaftersalesagent.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[11].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSave();
  await action.clickAction();
  await action.clickActionResOrRej();
  await action.clickRejectorResolve();
  await action.clickSaveandClose();
  await page.reload();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await expect(page.locator("(//td[.='Status']/../td)[2]//span[.='Resolved']")).toBeVisible();
  await action.clickSaveandClose();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

});
