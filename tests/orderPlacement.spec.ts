import { test, expect } from "../fixtures";
import { generateOrderData, OrderObject } from "../testData/DataObjects";

let orderData: OrderObject;

test.beforeAll(async ({ }) => {
    orderData = generateOrderData();
});

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.login();
});

test('Place an order @smoke @regression', async ({ productsPage, cartPage, checkoutPage }) => {
    const products = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
    ];
    await productsPage.addProductsToCart(products);
    await cartPage.goToCart();
    await cartPage.validateCartItems(products);
    await checkoutPage.goToCheckout();
    await checkoutPage.submitCheckoutForm(orderData.firstName, orderData.lastName, orderData.postalCode);
    await checkoutPage.completeOrder();
});

test('Place an order without filling out the checkout form @smoke @regression', async ({ productsPage, cartPage, checkoutPage }) => {
    const products = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
    ];
    await productsPage.addProductsToCart(products);
    await cartPage.goToCart();
    await cartPage.validateCartItems(products);
    await checkoutPage.goToCheckout();
    await checkoutPage.submitCheckoutForm('', '', '');
});

test('Check order total price @smoke @regression', async ({ productsPage, cartPage, checkoutPage }) => {
    const products = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
    ];
    const productPrices = await productsPage.getProductPrices(products);
    await productsPage.addProductsToCart(products);
    await cartPage.goToCart();
    await cartPage.validateCartPrices(productPrices);
    const cartTotal = await cartPage.calculateCartTotal();
    await checkoutPage.goToCheckout();
    await checkoutPage.submitCheckoutForm(orderData.firstName, orderData.lastName, orderData.postalCode);
    await checkoutPage.validateCheckoutTotal(cartTotal);
    await checkoutPage.completeOrder();
});