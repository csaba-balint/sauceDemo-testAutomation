import { Locator, Page, expect } from "@playwright/test";
import { CartPage } from "../CartPage/CartPage";

export class CheckoutPage extends CartPage {
    // Checkout
    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueButton: Locator;
    finishButton: Locator;
    completeImage: Locator;
    completeHeader: Locator;
    completeMessage: Locator;
    backHomeButton: Locator;

    // Checkout Overview
    summarySubtotal: Locator;
    summaryTax: Locator;
    summaryTotal: Locator;

    // Error message
    errorMessage: Locator;

    // URL
    checkoutStepOneUrl: RegExp = /\/checkout-step-one\.html/;
    checkoutStepTwoUrl: RegExp = /\/checkout-step-two\.html/;
    checkoutCompleteUrl: RegExp = /\/checkout-complete\.html/;

    // Strings
    completeHeaderText: string = 'Thank you for your order!';
    completeMessageText: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';
    errorMessageText: string = 'Error: First Name is required';

    constructor(protected readonly page: Page) {
        super(page);

        // Checkout Step One
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('[data-test="continue"]');

        // Checkout Step Two
        this.finishButton = page.locator('[data-test="finish"]');
        this.summarySubtotal = page.locator('[data-test="subtotal-label"]');
        this.summaryTax = page.locator('[data-test="tax-label"]');
        this.summaryTotal = page.locator('[data-test="total-label"]');

        // Checkout Complete
        this.completeImage = page.locator('[data-test="pony-express"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeMessage = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        // Error message
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(this.checkoutStepOneUrl);
    }

    async submitCheckoutForm(firstName: string, lastName: string, postalCode: string) {    
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
        await this.page.waitForLoadState('networkidle');
        if (firstName === '' || lastName === '' || postalCode === '') {
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText(this.errorMessageText);
        }
        else {
            await expect(this.page).toHaveURL(this.checkoutStepTwoUrl);
        }
    }

    async completeOrder() {
        await this.finishButton.click();
        await expect(this.page).toHaveURL(this.checkoutCompleteUrl); 
        await expect(this.completeImage).toBeVisible();
        await expect(this.completeHeader).toBeVisible();
        await expect(this.completeHeader).toContainText(this.completeHeaderText);
        await expect(this.completeMessage).toBeVisible();
        await expect(this.completeMessage).toContainText(this.completeMessageText);
        await expect(this.backHomeButton).toBeVisible();
    }

    async getCheckoutSubtotal(): Promise<number> {
        const subtotalText = await this.summarySubtotal.innerText();
        return parseFloat(subtotalText.replace('Item total: $', ''));
    }

    async getCheckoutTax(): Promise<number> {
        const taxText = await this.summaryTax.innerText();
        return parseFloat(taxText.replace('Tax: $', ''));
    }

    async getCheckoutTotal(): Promise<number> {
        const totalText = await this.summaryTotal.innerText();
        return parseFloat(totalText.replace('Total: $', ''));
    }

    async validateCheckoutTotal(expectedSubtotal: number) {
        const actualSubtotal = await this.getCheckoutSubtotal();
        const tax = await this.getCheckoutTax();
        const total = await this.getCheckoutTotal();

        expect(actualSubtotal, 'Subtotal should match expected').toBeCloseTo(expectedSubtotal, 2);
        expect(total, 'Total should equal subtotal + tax').toBeCloseTo(actualSubtotal + tax, 2);
    }
}
