const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {LeadPage} = require("../../pages/leadCreationPage");
const cred = require("../../test_data/Credentials.config");

test.beforeEach("Launch the Browser", async ({page}) => {
  await page.goto(cred.url);
});


test('test', async ({ page }) => {
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
  const leadname = await lead.getLeadName();
  await lead.clickSaveandContinue();
  await lead.saveandcontinue.waitFor({state:'hidden'});
  await lead.clickCancel();

  await contact.clickCreateLead();
  await lead.selectANBProductType("Asset");
  await lead.selectProduct("Housing Loan");
  await lead.selectfollowUpPref("Branch");
  await lead.clickSaveandClose();

  await expect(page.locator('[id="_FOd1\\:\\:msgDlg\\:\\:contentContainer"]')).toContainText('Lead with same Product type is already active for this Customer');
  await lead.clickOk();
  await lead.clickCancel();
  
  await lead.openCreadedLead(leadname);
  await lead.clickActions();
  await lead.clickRetire();
  const reason = "Cancelled";
  await lead.selectRetireReason(reason);
  await lead.enterRetireComment("Retired the Lead");
  await lead.clickSubmit();
  await lead.submit.waitFor({state:'hidden'});
  await lead.clickCancel();

  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
});

test.afterEach("Close Browser", async ({page}) => {
  await page.close();
});