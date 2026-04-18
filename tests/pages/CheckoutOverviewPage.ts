import { type Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get itemTotal() {
    return this.page.locator('[data-test="summary-subtotal-label"]');
  }

  get tax() {
    return this.page.locator('[data-test="summary-tax-label"]');
  }

  get total() {
    return this.page.locator('[data-test="summary-total-label"]');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getTotal(): Promise<string> {
    return await this.total.textContent() ?? '';
  }
}