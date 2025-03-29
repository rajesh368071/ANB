// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
//import { test, expect } from '@playwright/test';

/*test('test', async ({ page }) => {
  await page.goto('https://login-iaczkf-dev1.fa.ocs.oraclecloud.com/oam/server/obrareq.cgi?encquery%3DxG5%2F9GGSmEAfkRDPO9GmYRZc7GjJGcryItN%2BHy7cCTjVU7h4ILOktj%2BkKTueumaLS56rCEa6FCajrh%2BzPeZdplk9lwvFAKhyZqXF23yKhDHDQeQXX0BwMZOV7oTxFb4lNJLscqdtm9E8tEG5LK3MWFR8zXr8dtzuY4PgdZNYiwfWbdXJCTzKmX2kvKT7nCYKS902Byelnfu7HZZr4AqeE9TBSDGGSLHuUD%2FY%2FEMCZfzjL1uKsmWlY5BkKHzV%2F38EXJk4APCqDUbJRnMXH%2BWTyrVv%2BoW4HcoiG%2BU0FqX3d8rH7QUvL%2BI8qW5K7%2FSgOU1Nq3mAr9Y3ehDWhsGdHPx8gMO4LQQONXDAr715YdrDU40gN%2BvUE9FraCFIZ0nlr5WNP%2BA2I6FCuSVqi0llpYj5p5tA0vce8r583iJgxYVkculA0%2Bym6EPyIR4nPf8nHxUmNXkr0K54g%2B2R1ILqDI6ozu1S0Y%2FyPK6yfbiqISvQCOzpzdbtdjWQhrqoLG8pg8aGCWDwBjZqvXFJjqQh5tOAo66wXMNpFPe1Ff179hpwpl1QobtOMhHjzyl6jAtnf8a1068UToUrcvIUQ9%2B6JIZHi3YVw9UqiAl5NNYxPlRK8yDGccDPd7DXdnpdS7zileuWGVyC%2BrUnRAExxCYRMouaOju49lxopkpIW4Znkh2KTGjAc1bcEenq2iV8ZIgVM2Ftyqj%2B29YCyzIj4qcnteLYOcnq5oYbyggL5QMc9t0XAEJPyLprGE4Fi0K6h8AFub4MYdC5%2BMLTPrYdY7tQPgOQ9R6iWe7TarzsGHnxtfmQBOhNorWyaw1H3vKyGGfRe5xfBP7q%2BZ%2BdQp78oagHDtJ%2F24NDMPn90K2zF99hrqbqSR53PgorNwv1AYXWyLoOHoQ0QaB%2FwbSe6MunzXPn2AApdNO7dNumsdXWMzAkmQwxC3AERzTZJqh40UzCQIiEweF9f9GSL4lVuixoYUDju8N%2B8mrBNQDTwAPtpD2WveVTlDkIDIKxlAL4Y8Qh4VNcUgb0sLYpY5lyk7oSGJdmbzlBLlywwoc9fSqhwMimg6uBKwrwu9V9Eq7yzuYip2cYUdbnxgIJFG%2FDH6weVsnXCS5GngmqrgihKLoGJ8%2FoLcnx%2FXKkxRov4dCHoDfpLmla%2FXoi1hZYupaOSOBZTBWKlmF8OE2piG454TjejvUVtDGrpRE0s6UfwzuAFuVkW0UqlE97kIHb3M59rl%2BaXgZwxp5%2F9llxA6s2rSF7Wi5fEjsq6uNfOZIluGSL3o9q9K8OSKMmRM%2Bhj4hydtsBBs1HvWqpe9pSkrFFW%2BqKgZIsbw2MN%2B3uEnOt0Y2VE0EZhuui9TJyffjgd%2BYt%2FUqHL2TiXBGHWptggmq0lPjbiwfwnH1ua%2BDkxwn88ATTUPPB9qon2tY0qHbkID3y5KulHrg1VqX4vPq%2FUcwmfT5TzCrKyI%2FQTRT3gqPVs49edl0mAFTI%2BExbY3ODo7donfTYnujG8Tr7HnLAQ39Ewpfh97%2FwERKqDC5fEAaypE5noYlcAegnvOBBZLPXXlL2tJ3X%2B8%2BAgKebLmH%2B8m2OSunYQKiIodpcNA5VLTRircT4Bn4LeS0Ozp0oMpY7B8LziEIvrLcV4twOeacLBLPMuUIf41vHjPQZvrAe5gk45D9cL%2FpRZ3Kl%2FjJB%20agentid%3DOraFusionApp_11AG%20ver%3D1%20crmethod%3D2%26cksum%3D0ce016b7470f80f6223bb1d61292cd8b2cf55d96&ECID-Context=1.006B0eoPxTCBX7T6yBjc6G002tI90008OY%3BkXjE');
  await page.getByPlaceholder('User ID').click();
  await page.getByPlaceholder('User ID').fill('SamihaSAlamri@anb.com.sa');
  await page.getByPlaceholder('User ID').press('Tab');
  await page.getByPlaceholder('Password').fill('Welcome@123');
  await page.getByPlaceholder('Password').press('Tab');
  await page.getByRole('link', { name: 'Forgot Password' }).press('Tab');
  await page.getByRole('button', { name: 'Sign In' }).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByText('Lead: ABDULAZIZ QASSIM 18/01/2025 11:39 AM').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('td').filter({ hasText: /^Favorites and Recent Items$/ }).click();
  await page.getByRole('link', { name: 'Favorites and Recent Items' }).click();
  await page.getByRole('link', { name: 'Favorites', exact: true }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByText('Contact: ABDULAZIZ QASSIM').click();
  await page.getByRole('link', { name: 'Leads' }).click();
  await page.getByRole('link', { name: 'ABDULAZIZ QASSIM 18/01/2025 11:39 AM' }).click();
  await page.getByRole('combobox', { name: 'Product Type', exact: true }).click();
  await page.getByText('Personal Loan').click();
  await page.getByRole('combobox', { name: 'Product Type', exact: true }).click();
  await page.getByText('+966').click();
  await expect(page.getByLabel('Total Number Of Dependents')).toBeVisible();
  await page.getByTitle('Preferred Time').click({
    button: 'right'
  });
  await page.getByText('Loading...Skip to main').press('ControlOrMeta+f');
  await page.getByTitle('Preferred Language').click();
  await page.getByLabel('Preferred Language').press('ControlOrMeta+f');
  await page.getByLabel('ID Number').click();
  await expect(page.getByLabel('ID Number')).toBeVisible();
  await page.getByRole('combobox', { name: 'ID Type' }).click();
  await expect(page.getByRole('combobox', { name: 'ID Type' })).toBeVisible();
  await page.locator('td').filter({ hasText: 'COW SqMtSC Wall AreaLand' }).nth(2).click();
  await expect(page.getByRole('combobox', { name: 'Province' })).toBeVisible();
  await expect(page.getByText('Date of Birth')).toBeVisible();
  await expect(page.getByLabel('Employer Code')).toBeVisible();
  await expect(page.getByLabel('Food Expenses')).toBeVisible();
  await expect(page.getByLabel('Transportation Expenses')).toBeVisible();
  await expect(page.getByLabel('Telecom Expenses')).toBeVisible();
  await expect(page.getByLabel('HealthCare Expenses')).toBeVisible();
  await expect(page.getByLabel('Housing Expenses')).toBeVisible();
  await expect(page.getByLabel('Education Expenses')).toBeVisible();
  await expect(page.getByLabel('Insurance Expenses')).toBeVisible();
  await expect(page.getByLabel('Domestic Labor Expenses')).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Living House Type' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Loan Purpose' })).toBeVisible();
  await expect(page.getByText('Customer Primary Email')).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Salary Certificate Type' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Salary Certificate Type' }).click();
  await page.getByText('Basic_Allowances').click();
  await page.getByTitle('Basic Salary').locator('span').click();
  await page.locator('td').filter({ hasText: 'COW SqMtSC Wall AreaLand' }).nth(2).click();
});*/