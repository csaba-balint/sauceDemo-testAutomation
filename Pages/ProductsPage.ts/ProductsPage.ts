import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "../LoginPage/LoginPage";

export class ProductsPage extends LoginPage {
    // Products page elements
    productsTitle: Locator;
    menuButton: Locator;
    logoutButton: Locator;
    cartButton: Locator;

    // Products
    productCards: Locator;
    productCardName: Locator;
    productCardPrice: Locator;
    addToCartButton: Locator;

    // URL
    productsUrl: RegExp = /\/inventory\.html/;

    constructor(protected readonly page: Page) {
        super(page);
        this.productsTitle = page.locator('.title');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.cartButton = page.locator('#shopping_cart_container');

        // Products
        this.productCards = page.locator('[data-test="inventory-item"]');
        this.productCardName = page.locator('[data-test="inventory-item-name"]');
        this.productCardPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('button:has-text("Add to cart")');

    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async addProductsToCart(products?: Array<string>) {
        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {
          const card = this.productCards.nth(i);
          const title = await card.locator(this.productCardName).innerText();
      
          if (!products || products.includes(title.trim())) {
            const addButton = card.locator(this.addToCartButton);
            if (await addButton.isVisible()) {
              await addButton.click();
            }
          }
        }
    }

    async getProductPrices(productNames: Array<string>): Promise<Map<string, number>> {
        const productPrices = new Map<string, number>();
        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);
            const name = await card.locator(this.productCardName).innerText();
            
            if (productNames.includes(name.trim())) {
                const priceText = await card.locator(this.productCardPrice).innerText();
                const price = parseFloat(priceText.replace('$', ''));
                productPrices.set(name.trim(), price);
            }
        }
        return productPrices;
    }
}
