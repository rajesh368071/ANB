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


test('Verify able to Retired Lead without Reason', async ({ page }) => {
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
  await lead.clickSubmit();

  await expect(page.getByText('You must make at least one')).toBeVisible();
  
  const reason = "Cancelled";
  await lead.selectRetireReason(reason);
  await lead.clickSubmit();
  
  await lead.clickCancel();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
});

test.afterEach("Close the Browser", async ({page}) => {
  await page.close();
});
