const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../pages/loginPage");
const {HomePage} = require("../pages/homePage");
const {ContactPage} = require("../pages/contactPage");
const {ServiceRequest} = require("../pages/serviceRequest");
const {Actions} = require("../pages/actionPage");
const cred = require("../test_data/Credentials.config");
const dataRead = require("../utils/excelReader");

const data = dataRead.sheetDate("SDNonInt")[1];
const assignToNames = dataRead.sheetDate("assignToNames");

test.afterEach("close the browser", async ({page}) => {
  await page.close();
});

test('Issue in Emergency Cash Subscription Flow End to End', async ({ page }) => {
  test.setTimeout(0);
  test.slow();

  await page.goto(cred.url);

  const login = new LoginPage(page);
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const servicerequest = new ServiceRequest(page);
  const action = new Actions(page);
  
  await login.enterUsername(cred.branchofficer.username);
  await login.enterPassword(cred.branchofficer.password);
  await login.clickSignin();
  await home.clickHome();
  await home.enterSearch("Areef Ali");
  await home.clickSearch();
  await home.clickContactName();
  await contact.clickServiceRequest();
  await servicerequest.clickCreateServiceRequest();
  await servicerequest.clickHirarchy();
  await servicerequest.enterSRName(data.RequestName);
  await servicerequest.clickSearchAll();
  await servicerequest.selectSRfromResult(data.RequestFullNameWithArabic);
  await servicerequest.clickOK();
  
  await servicerequest.selectAccount();
  await servicerequest.enterProblemDescription("Automation Test");
  await servicerequest.clickSaveandClose();
  const srnumber = await servicerequest.clickCreatedSR(data.SRNameArabic);
  await servicerequest.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername(cred.itgoutsystemsupportunit.username);
  await login.enterPassword(cred.itgoutsystemsupportunit.password);
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[3].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickAction();
  await action.clickActionResOrRej();
  await action.clickRejectorResolve();

  await expect(page.locator("(//td[.='Status']/../td)[2]//span[.='Resolved']")).toBeVisible();

  await servicerequest.clickSaveandClose();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

});


test.afterEach("close the browser", async ({page}) => {
  await page.close();
});