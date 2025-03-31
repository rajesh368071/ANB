const { test } = require('@playwright/test');

export class LeadPage {
    
    constructor(page) {
        this.page = page;

        //Source Locator
        this.source = page.getByRole('combobox', { name: 'Source' });
        this.sourceOpt = (opt) => { return page.getByText(`${opt}`) };

        //ANB Product Type Locator
        this.anbproductType = page.getByRole('combobox', { name: 'ANB Product Type' });
        this.anbproductTypeOpt = (opt) => { return page.getByText(`${opt}`, { exact: true }) };

        //Product Type Locator
        this.productType = page.getByRole('combobox', { name: 'Product Type', exact: true });
        this.productTypeOpt = (opt) => { return page.getByText(`${opt}`, { exact: true }) };

        //Follow Up Prefference Locator
        this.followUpPref =  page.getByRole('combobox', { name: 'Follow-up Preference' });
        this.followUpPrefOpt = (opt) => { return page.getByText(`${opt}`) };

        //Product Locator
        this.product = page.getByTitle('Search: Product');
        this.productSearchLink = page.getByRole('link', { name: 'Search...' });
        this.productName = page.getByLabel('Name', { exact: true });
        this.productSearch = page.locator('[id="__af_Z_window"]').getByRole('button', { name: 'Search' });
        this.producSelectRadio = page.getByRole('row', { name: 'Housing loans 005HSL' }).locator('label');
        this.ok = page.getByRole('button', { name: 'OK' });

        //All Buttons Locators
        this.saveandclose = page.getByRole('button', { name: 'Save and Close' });
        this.saveandcontinue = page.getByRole('button', { name: 'Save and Continue' });
        this.actions = page.locator('[id="__af_Z_window"]').getByRole('button', { name: 'Actions' });
        this.save = page.getByRole('button', { name: 'Save', exact: true });

        //retire Lead
        this.retire = page.getByText('Retire', { exact: true });
        this.retireReason =  page.getByRole('combobox', { name: 'Retire Reason' });
        this.retireReasonOpt =  (opt) => { return page.getByRole('listbox').getByText(`${opt}`) };
        this.retireComment = page.getByRole('textbox', { name: 'Comments' });
        this.submit = page.getByRole('button', { name: 'Submit' });

        //to Get Lead Name
        this.leadName = page.locator("//input[@aria-label='Lead Name']");
        this.leadNumber = (opt) => { return page.getByRole('link', { name: `${opt}` }) };

        //Cancel and Ok Button
        this.cancel = page.locator('[id="__af_Z_window"]').getByRole('button', { name: 'Cancel' });
        this.ok = page.getByRole('button', { name: 'OK' });

        //Calculation Offer
        this.idtype = page.getByRole('combobox', { name: 'ID Type' });
        
        //qualificaton 
        this.qualification = page.getByRole('link', { name: 'Qualification' });
        this.questions = page.locator("//div[@title='Question']//input[@role='combobox']");
        this.yes = page.getByRole('listbox').getByText('Yes');
        this.no = page.getByRole('listbox').getByText('No');
        this.generateLeadScore = page.getByText('Generate Lead Score');
        this.summary = page.getByRole('link', { name: 'Summary' });
    }

    async clickSave() {
        await test.step('Click Save', async () => {
            await this.save.click();
        });
    }


    async selectYesforQuestion(num) {
        await test.step(`Question ${num}`, async () => {
            await this.questions.nth(num).click();
            await this.yes.click();
        });
    }

    async clickGenerateLeadScore() {
        await test.step("Click Generate Lead Score", async () => {
            await this.generateLeadScore.click();
        });
    }

    async clickSummary() {
        await test.step("Click Qualification", async () => {
            await this.summary.click();
        });
    }

    async clickQualification() {
        await test.step("Click Qualification", async () => {
            await this.qualification.click();
        });
    }

    async clickOk() {
        await test.step("Click on OK", async () => {
            await this.ok.click();
        });
    }

    async clickCancel() {
        await test.step("Click on Cancel", async () => {
            await this.cancel.click();
        });
    }

    async openCreadedLead(leadName) {
        await test.step("Click on Created Lead", async () => {
            await this.leadNumber(leadName).click();
        });
    };

    async getLeadName() {
        return await this.leadName.inputValue();
    }

    async selectSource(opt) {
        await test.step("Select Source", async () => {
            await this.source.click();
            await this.sourceOpt(opt).click();
        });      
    }

    async selectANBProductType(opt) {
        await test.step("Select ANB Product Type", async () => {
            await this.anbproductType.click();
            await this.anbproductTypeOpt(opt).click();
        });
    }

    async selectProductType(opt) {
        await test.step("Select Product Type", async () => {
            await this.productType.click();
            await this.productTypeOpt(opt).click();
        });
    }

    async selectProduct(name) {
        await test.step("Select Product", async () => {
            await this.product.click();
            await this.productSearchLink.click();
            await this.productName.fill(name);
            await this.productSearch.click();
            await this.producSelectRadio.click();
            await this.ok.click();
        });
    }

    async selectfollowUpPref(opt) {
        await test.step("Select Follow Up Preference", async () => {
            await this.followUpPref.click();
            await this.followUpPrefOpt(opt).click();
        });
    }

    async clickSaveandClose() {
        await test.step("Click Save and Close", async () => {
            await this.saveandclose.click();
        });
    }

    async clickSaveandContinue() {
        await test.step("Click Save and Continue", async () => {
            await this.saveandcontinue.click();
        });
    }

    async clickActions() {
        await test.step("Click Actions", async () => {
            await this.actions.click();
        });
    }

    async clickRetire() {
        await test.step("Click Retire", async () => {
            await this.retire.click();
        });
    }

    async selectRetireReason(retiredreason) {
        await test.step("Select Retire Reason", async () => {
            await this.retireReason.click();
            await this.retireReasonOpt(retiredreason).click();
        });
    }

    async enterRetireComment(retirecoment){
        await test.step("Select Retire Reason", async () => {
            await this.retireComment.fill(retirecoment);
        });
    }

    async clickSubmit(){
        await test.step("Click Submit", async () => {
            await this.submit.click();
        });
    }

}