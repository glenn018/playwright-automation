import { Page, Locator, expect } from '@playwright/test';

const baseURL = "https://www.saucedemo.com/"

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('//div[@id="login_button_container"]/div/form/div[3]');
  }

  async goto(): Promise<void> {
    await this.page.goto(baseURL);
  }

  async typeUsername(value: string): Promise<void> {
    await this.usernameInput.fill(value);
  }

  async typePassword(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async expectErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}