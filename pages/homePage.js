const { test, expect } = require('@playwright/test');

export class HomePage { 

    constructor(page) {
        this.contactName = "";
        this.page = page;
        this.profile = page.getByRole('link', { name: 'Settings and Actions' });
        this.signout = page.getByRole('link', { name: 'Sign Out' });
        this.conform = page.getByRole('button', { name: 'Confirm' });
        this.home = page.getByRole('link', { name: 'Home', exact: true });
        this.search = page.locator('//input[@aria-label="Search:"]');//page.getByPlaceholder('Search');
        this.searchIcon = page.getByRole('link', { name: 'Search', exact: true });
        this.contact = page.getByRole('link', { name: `Contact: ${this.contactName}` });
        this.account = page.getByRole('link', { name: `Company: ${this.contactName}` });
        this.servicerequest = page.getByRole('link', { name: 'Service Requests' });
    }

    async clickProfile() {
        await test.step("Click Profile", async () => {
            await this.profile.click();
        });
    }

    async clickSignout() {
        await test.step("Click Signout", async () => {
            await this.signout.click();
        });
    }

    async clickConform() {
        await test.step("Click Conform", async () => {
            await this.conform.click();
        });
    }

    async clickHome() {
        await test.step("Click Home", async () => {
            await this.home.click();
        });
    }

    async enterSearch(name) {
        await test.step("Enter Global Search", async () => {
            this.contactName = name;
            await this.search.fill(name);
        });
    }

    async clickSearch() {
        await test.step("Click Search Icon", async () => {
            await this.searchIcon.click();
        });
    }

    async clickContactName() {
        await test.step("Select Contact Name", async () => {
            await this.contact.click();
        });
    }

    async clickAccountName() {
        await test.step("Select Account Name", async () => {
            await this.account.click();
        });
    }

    async clickServiceRequest() {
        await test.step("Select Service Request", async () => {
            await this.servicerequest.click();
        });
    }
}