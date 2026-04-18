import { type Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  get backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]');
  }

  async verifyOrderConfirmation() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}