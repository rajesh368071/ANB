const { test, expect } = require('@playwright/test');


export class ContactPage {

    constructor(page) {
        this.page = page;
        this.lead = page.getByRole('link', { name: 'Leads' });
        this.createLead = page.getByRole('button', { name: 'Create Lead' });
        this.serviceRequest = page.getByRole('link', { name: 'Service Requests' });

        this.source = page.getByRole('combobox', { name: 'Source' });
        this.sourceOpt = (opt) => { return page.getByText(`${opt}`) };
    }

    async clickLead(){
        await test.step("Click Subtab Lead", async () => {
            await this.lead.click();
        });
    }

    async clickServiceRequest(){
        await test.step("Click Subtab Service Request", async () => {
            await this.serviceRequest.click();
        });
    }

    async clickCreateLead(){
        await test.step("Click Subtab Service Request", async () => {
            await this.createLead.click();
        });
    }
    
}