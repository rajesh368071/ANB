const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../pages/loginPage");
const {HomePage} = require("../pages/homePage");
const {ContactPage} = require("../pages/contactPage");
const {ServiceRequest} = require("../pages/serviceRequest");
const {Actions} = require("../pages/actionPage");
const dataRead = require("../utils/excelReader");

const data = dataRead.sheetDate("flagsheet")[1];
const assignToNames = dataRead.sheetDate("assignToNames");

test.afterEach("close the browser", async ({page}) => {
  await page.close();
});

test('International cash withdrawal', async ({ page }) => {
  test.setTimeout(0);
  test.slow();

  await page.goto('https://login-iaczkf-dev1.fa.ocs.oraclecloud.com/');

  const login = new LoginPage(page);
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const servicerequest = new ServiceRequest(page);
  const action = new Actions(page);
  
  await login.enterUsername("branchofficer");
  await login.enterPassword("Welcome@1234");
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
  await servicerequest.enterAmount('1232');
  await servicerequest.enterDate("12/01/2025");
  //await servicerequest.enterRefundDate("12/12/2025");
  await servicerequest.enterReferenceNumber("1232345");
  //await servicerequest.selectCurrency("SAR - Saudi Riyal");
  //await servicerequest.enterWebsite("www.anb.com");
  await servicerequest.enterProblemDescription("Automation Test");
  await servicerequest.clickSaveandClose();
  const srnumber = await servicerequest.clickCreatedSR(data.SRNameArabic);
  await servicerequest.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
  
  await login.enterUsername("chargebackunit");
  await login.enterPassword("Welcome@1234");
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[0].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername("chargebackunit2");
  await login.enterPassword("Welcome@1234");
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[1].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickSubmit();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

  await login.enterUsername("chargebackunithead");
  await login.enterPassword("Welcome@1234");
  await login.clickSignin();
  await home.clickServiceRequest();
  await action.searchSRNumber(srnumber);
  await action.clickSRNumberfromResult(srnumber);
  await action.assignedTo(assignToNames[2].assignTo);
  await action.clickAction();
  await action.clickMarkDeptWorkComplete();
  await action.clickAction();
  await action.clickActionResOrRej();
  await action.clickRejectorResolve();
  await servicerequest.clickSaveandClose();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();

});
