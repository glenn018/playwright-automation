import { test, expect } from '@playwright/test';
import { LoginFlow } from '../flows/LoginFlow';
import * as dotenv from 'dotenv';
dotenv.config({ override: true }); 

const username = process.env.APP_USERNAME!;
const password = process.env.APP_PASSWORD!;

test.describe('Login', () => {
  test('valid credentials land on dashboard', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAs(username, password);
    await expect(page).toHaveURL(/inventory.html/);

  });

  test('invalid credentials show error', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginWithInvalidCredentials('admin', 'wrong');
    await expect(page).toHaveURL(/www.saucedemo.com/);
  });

  test('user can log out', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAs(username, password);
    await loginFlow.logout();
    await expect(page).toHaveURL(/www.saucedemo.com/);
  });
});