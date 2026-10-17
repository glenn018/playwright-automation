import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage';

export class LoginFlow {
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  
  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.typeUsername(username);
    await this.loginPage.typePassword(password);
    await this.loginPage.clickLogin();
    await this.dashboardPage.expectLoaded();
  }

  async loginWithInvalidCredentials(username: string, password: string): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.typeUsername(username);
    await this.loginPage.typePassword(password);
    await this.loginPage.clickLogin();
    await this.loginPage.expectErrorVisible();
  }

  async logout(): Promise<void> {
    await this.dashboardPage.clickLogout();
  }
}