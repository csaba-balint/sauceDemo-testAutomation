import { faker } from "@faker-js/faker";

export interface OrderObject {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export function generateOrderData(): OrderObject {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode()
    };
}
    