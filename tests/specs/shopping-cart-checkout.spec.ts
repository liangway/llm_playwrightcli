import { test, expect } from '@playwright/test';
import data from '../data.json';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Shopping Cart and Checkout', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await page.goto(data.url);
  });

  test('Successfully add item and checkout', async ({ page }) => {
    await loginPage.login(data.username, data.password);
    await expect(page).toHaveURL(/.*inventory.html/);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await expect(page).toHaveURL(/.*cart.html/);

    await expect(cartPage.cartItem).toHaveCount(1);

    const itemTotal = await cartPage.cartItemPrice.textContent();
    expect(itemTotal).toBe('$29.99');

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    await checkoutPage.fillShippingDetails('John', 'Doe', '12345');
    await checkoutPage.continue();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    await checkoutOverviewPage.finishOrder();
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    await checkoutCompletePage.verifyOrderConfirmation();
  });
});