const { test, expect } = require("@playwright/test");
const {LoginPage} = require("../../pages/loginPage");
const {HomePage} = require("../../pages/homePage");
const {ContactPage} = require("../../pages/contactPage");
const {LeadPage} = require("../../pages/leadCreationPage");
const cred = require("../../test_data/Credentials.config");


test.beforeEach("Launch the Browser", async ({page}) => {
  await page.goto(cred.url);
});

test('Verify Qualification Scores', async ({ page }) => {
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
  

  const scoreAssert = page.locator("(//td[@title='Score']/following-sibling::td//span)[1]");
  const rankAssert = page.locator("(//td[@title='Rank']/following-sibling::td//span)[1]");
  
  await lead.clickQualification();
  await lead.selectYesforQuestion(0);
  await lead.clickSave();
  await lead.clickSummary();
  await lead.clickActions();
  await lead.clickGenerateLeadScore();
  await expect(scoreAssert).toHaveText('20');
  await expect(rankAssert).toHaveText('Cold');

  await lead.clickQualification();
  await lead.selectYesforQuestion(1);
  await lead.clickSave();
  await lead.clickSummary();
  await lead.clickActions();
  await lead.clickGenerateLeadScore();
  await expect(scoreAssert).toHaveText('40');
  await expect(rankAssert).toHaveText('Cold');

  await lead.clickQualification();
  await lead.selectYesforQuestion(2);
  await lead.clickSave();
  await lead.clickSummary();
  await lead.clickActions();
  await lead.clickGenerateLeadScore();
  await expect(scoreAssert).toHaveText('60');
  await expect(rankAssert).toHaveText('Warm');

  await lead.clickQualification();
  await lead.selectYesforQuestion(3);
  await lead.clickSave();
  await lead.clickSummary();
  await lead.clickActions();
  await lead.clickGenerateLeadScore();
  await expect(scoreAssert).toHaveText('80');
  await expect(rankAssert).toHaveText('Hot');

  await lead.clickQualification();
  await lead.selectYesforQuestion(4);
  await lead.clickSave();
  await lead.clickSummary();
  await lead.clickActions();
  await lead.clickGenerateLeadScore();
  await expect(scoreAssert).toHaveText('100');
  await expect(rankAssert).toHaveText('Hot');
  

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

test.afterEach("Close the Browser", async ({page}) => {
  await page.close();
});