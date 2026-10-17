import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeBanner: Locator;
  readonly logoutButton: Locator;
  readonly menuItem: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeBanner = page.locator('//div[@class="app_logo" and contains(text(), "Swag Labs")]');
    this.menuItem = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.welcomeBanner).toBeVisible();
  }

  async clickLogout(): Promise<void> {
    await this.menuItem.click();
    await this.logoutLink.click();
  }
}