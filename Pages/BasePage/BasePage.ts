import { Page } from "@playwright/test";

export class BasePage {
	constructor(protected page: Page) {}

	// URLs
	partialUrl!: RegExp;

	async goTo() {
		await this.page.goto('/');
	}
}