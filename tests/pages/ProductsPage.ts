import { type Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addToCartButton = (productName: string) =>
    this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`);

  get shoppingCartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get shoppingCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCart(productName: string) {
    const selector = this.addToCartButton(productName);
    await selector.click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}