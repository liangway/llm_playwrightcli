import { type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  get cartItem() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get cartQuantity() {
    return this.page.locator('[data-test="item-quantity"]');
  }

  get cartItemPrice() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItem.count();
  }
}