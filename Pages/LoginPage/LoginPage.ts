import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";

export class LoginPage extends BasePage {
	// Log in form
	emailInput: Locator;
	passwordInput: Locator;
	loginButton: Locator;
    loginLogo: Locator;
    errorMessage: Locator;

    // Error message texts
    usernameAndPasswordDoNotMatchErrorMessageText: string;
    lockedOutUserErrorMessageText: string;

    constructor(protected readonly page: Page) {
       super(page);
       this.emailInput = page.locator('#user-name');
       this.passwordInput = page.locator('#password');
       this.loginButton = page.locator('#login-button');
       this.loginLogo = page.locator('.login_logo');
       this.errorMessage = page.locator('[data-test="error"]');

       // Error message texts
       this.usernameAndPasswordDoNotMatchErrorMessageText = 'Epic sadface: Username and password do not match any user in this service';
       this.lockedOutUserErrorMessageText = 'Epic sadface: Sorry, this user has been locked out.';

    }

    async login(email: string = 'standard_user', password: string = 'secret_sauce') { // Credentials should be stored in env variables or encrypted
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async validateErrorMessage(errorMessageText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(errorMessageText);
    }
}
