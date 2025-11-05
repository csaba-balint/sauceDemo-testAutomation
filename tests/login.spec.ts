import { test, expect } from "../fixtures";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Login with valid credentials @smoke @regression', async ({ page, loginPage, productsPage }) => {
    await loginPage.login();
    await expect(page).toHaveURL(productsPage.productsUrl);
    await expect(productsPage.productsTitle).toBeVisible();
});

test('Login with invalid credentials @smoke @regression', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_password'); // Credentials should be stored in env variables or encrypted
    await loginPage.validateErrorMessage(loginPage.usernameAndPasswordDoNotMatchErrorMessageText);
});

test('Login with locked out user @smoke @regression', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce'); // Credentials should be stored in env variables or encrypted
    await loginPage.validateErrorMessage(loginPage.lockedOutUserErrorMessageText);
});

test('Logout @smoke @regression', async ({ loginPage, productsPage }) => {
    await loginPage.login();
    await productsPage.logout();
    await expect(loginPage.loginLogo).toBeVisible();
});
