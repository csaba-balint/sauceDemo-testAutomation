import { Locator, Page, expect } from "@playwright/test";
import { ProductsPage } from "../ProductsPage/ProductsPage";

export class CartPage extends ProductsPage {

    // Cart
    cartItems: Locator;
    cartItemName: Locator;
    cartItemPrice: Locator;
    checkoutButton: Locator;

    // URL
    cartUrl: RegExp = /\/cart\.html/;

    constructor(protected readonly page: Page) {
        super(page);
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async goToCart() {
        await this.cartButton.click();
        await expect(this.page).toHaveURL(this.cartUrl);
    }

    async validateCartItems(expectedItems: Array<string>) {
        await this.cartItems.first().waitFor({ state: 'visible' });
        const cartItems = await this.cartItemName.allTextContents();

        expect(cartItems.map(item => item.trim())).toEqual(expectedItems.map(item => item.trim()));
    }

    async getCartPrices(): Promise<Map<string, number>> {
        await this.cartItems.first().waitFor({ state: 'visible' });
        const cartPrices = new Map<string, number>();
        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);
            const name = await item.locator(this.cartItemName).innerText();
            const priceText = await item.locator(this.cartItemPrice).innerText();
            const price = parseFloat(priceText.replace('$', ''));
            cartPrices.set(name.trim(), price);
        }
        return cartPrices;
    }

    async validateCartPrices(expectedPrices: Map<string, number>) {
        const cartPrices = await this.getCartPrices();
        
        expect(cartPrices.size).toBe(expectedPrices.size);
        for (const [productName, expectedPrice] of expectedPrices.entries()) {
            const actualPrice = cartPrices.get(productName);
            expect(actualPrice, `Price mismatch for ${productName}`).toBe(expectedPrice);
        }
    }

    async calculateCartTotal(): Promise<number> {
        const cartPrices = await this.getCartPrices();
        let total = 0;

        for (const price of cartPrices.values()) {
            total += price;
        }
        return total;
    }
}
