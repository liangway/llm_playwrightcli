import { type Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}