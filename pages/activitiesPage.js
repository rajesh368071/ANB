const { test, expect } = require('@playwright/test');

export class Activities {

    constructor(page) {
        this.page = page;

        this.activitie = page.getByRole('link', { name: 'Activities' });
        this.createTask =  page.getByRole('button', { name: 'Create Task' });
        this.admissionFee =  page.getByLabel('Administration Fee');
        this.ratePer =  page.getByLabel('Rate(%)');
        this.comment =  page.getByLabel('Comments', { exact: true });
        this.saveAndContinue =  page.getByRole('button', { name: 'Save and Continue' });
        this.actions = page.locator("//a[.='Actions']").nth(0);
        this.assignToApproval =  page.getByText('Assign To Approver');
        this.markComplete = page.getByText('Mark Complete');
        this.saveAndClose = page.getByRole('button', { name: 'Save and Close' });
        this.tasklink = (link) => { return page.getByRole('link', { name: `${link}` }); }

        this.subject = page.locator("//td[.='Subject']/following-sibling::td//span");
    }

    async clickMarkComplete(){
        await test.step("Click Mark Complete", async () => {
            await this.markComplete.click();
        });
    }

    async clickTask(taskname){
        await test.step("Click Task from Activities", async () => {
            await this.tasklink(taskname).click();
            await this.subject.waitFor({state:"visible", timeout:10e3});
        });
    }

    async getTaskSubject(){
        let subjectValue = await this.subject.innerText();
        return subjectValue;
    }

    async assignTo(assignToUsername) {       
        const patch = (text) => `//label[.='Assign to']/../following-sibling::td//*[.="${text}"]`;
        const assign = this.page.locator(patch(assignToUsername));
        assign.waitFor({state:'visible', timeout:5000});
    }

    async clickSaveAndClose() {
        await test.step("Click Save and Close", async () => {
            await this.saveAndClose.click();
            await this.activitie.waitFor({state:"visible", timeout:10e3});
        });
    }

    async clickAssignToApproval() {
        await test.step("Click Assign to Approval", async () => {
            await this.assignToApproval.click();
        });
    }

    async clickAction() {
        await test.step("Click Action", async () => {
            await this.actions.click();
        });
    }

    async clickSaveandContinue() {
        await test.step("Click Save and Continue", async () => {
            await this.saveAndContinue.click();
            await this.actions.waitFor({state:'visible', timeout:10e3});
        });
    }

    async enterComment(comment) {
        await test.step("Enter Comment", async () => {
            await this.comment.fill(comment);
        });
    }

    async enterRatePer(rateper) {
        await test.step("Enter Rate (%)", async () => {
            await this.ratePer.fill(rateper);
        });
    }

    async enterAdmissionFee(fee) {
        await test.step("Enter Admission Fee", async () => {
            await this.admissionFee.fill(fee);
        });
    }

    async clickCreateTask() {
        await test.step("Click Create Task", async () => {
            await this.createTask.click();
        });
    }

    async clickActivitieSubTab() {
        await test.step("Click Activitie Subtab", async () => {
            await this.activitie.click();
        });
    }


    

}