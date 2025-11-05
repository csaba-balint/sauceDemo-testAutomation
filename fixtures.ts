import { test as baseTest } from '@playwright/test';
import { LoginPage } from './Pages/Login/LoginPage';
import { ProductsPage } from './Pages/Login/ProductsPage.ts/ProductsPage';
import { CartPage } from './Pages/Login/ProductsPage.ts/CartPage.ts/CartPage';
import { CheckoutPage } from './Pages/Login/ProductsPage.ts/CartPage.ts/CheckoutPage/CheckoutPage';

type Fixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
}

export const test = baseTest.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect } from '@playwright/test';