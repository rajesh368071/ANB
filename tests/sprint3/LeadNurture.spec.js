const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {LeadPage} = require("../../pages/leadCreationPage");
const cred = require("../../test_data/Credentials.config");

test.beforeEach("Launch the Browser", async ({page}) => {
  await page.goto(cred.url);
});

test('Verify Lead Nurture', async ({ page }) => {
  test.setTimeout(0);
  
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const contact = new ContactPage(page);
  const lead = new LeadPage(page);
  
  await login.enterUsername(cred.smerm.username);
  await login.enterPassword(cred.smerm.password);
  await login.clickSignin();
  await home.clickHome();
  await home.enterSearch(cred.account);
  await home.clickSearch();
  await home.clickAccountName();
  await contact.clickLead();

  await contact.clickCreateLead();
  await lead.selectANBProductType("Asset");
  await lead.selectProduct("eComm", "E-Commerce eComm");
  await lead.clickSaveandContinue();
  const leadName = await lead.getLeadName();
  await lead.clickNurture();

  await expect(lead.remainderDateTime).toBeVisible();
  await expect(lead.nurtureComments).toBeVisible();

  await lead.enterRemainderDateTime("01/05/2025 12:00 AM");
  await lead.enterNurtureComment("Automation");
  await lead.clickSaveandClose();
  await lead.openCreadedLead(leadName);

  await expect(lead.remainderDateTime).toBeVisible();
  await expect(lead.nurtureComments).toBeVisible();

  await lead.clickActions();
  await lead.clickRetire();
  const reason = "Cancelled";
  await lead.selectRetireReason(reason);
  await lead.clickSubmit();
  
  await lead.submit.waitFor({state:'hidden'});
  await lead.clickCancel();
  await lead.cancel.waitFor({state:'hidden'});

  /*await lead.clickFilterStatus();
  await lead.selectStatus('Retired');
  await lead.clickAddFilter();
  const fieldname = 'Lead Name';
  await lead.clickAddFieldSearch(fieldname);
  await lead.enterAddFilterSearchName(fieldname, leadName);
  await lead.clickFilterSearch();
  await expect(page.getByRole('link', { name: leadName })).toBeVisible();*/
  
  await home.clickProfile();
  await home.clickSignout();
  await home.clickConform();
});

test.afterEach("Verify able to Retire the Lead", async ({page}) => {
  await page.close();
});
