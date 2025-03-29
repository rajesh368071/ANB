const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {LeadPage} = require("../../pages/leadCreationPage");
const cred = require("../../test_data/Credentials.config");
const {getFormattedDateDDMMYYYY} = require('../../utils/Util');


test.beforeEach("Launch the Browser", async ({page}) => {
  await page.goto(cred.url);
});

test('Verify able to Retire the Lead', async ({ page }) => {
  test.setTimeout(0);

  const login = new LoginPage(page);
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const lead = new LeadPage(page);
  
  await login.enterUsername(cred.smerm.username);
  await login.enterPassword(cred.smerm.password);
  await login.clickSignin();
  await home.clickHome();
  await home.enterSearch(cred.contact);
  await home.clickSearch();
  await home.clickContactName();
  await contact.clickLead();

  await contact.clickCreateLead();
  await lead.selectANBProductType("Asset");
  await lead.selectProduct("Housing Loan");
  await lead.selectfollowUpPref("Branch");
  await lead.clickSaveandContinue();

  await lead.clickActions();
  await lead.clickRetire();
  const reason = "Cancelled";
  await lead.selectRetireReason(reason);
  await lead.enterRetireComment("Retired the Lead");
  await lead.clickSubmit();

  const retiredStatusAssert = page.locator("(//td[@title='Status']/following-sibling::td//span)[2]");
  const retiredReasonAssert = page.locator("(//td[@title='Retire Reason']/following-sibling::td//span)[1]");
  const retiredDateAssert = page.locator("(//td[@title='Retired Date']/following-sibling::td//span)[1]");
  
  await expect(retiredStatusAssert).toHaveText('Retired');
  await expect(retiredReasonAssert).toHaveText(reason);
  await expect(retiredDateAssert).toHaveText(getFormattedDateDDMMYYYY());
  
  await lead.clickCancel();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
});

test.afterEach("Close the Browser", async ({page}) => {
  await page.close();
});