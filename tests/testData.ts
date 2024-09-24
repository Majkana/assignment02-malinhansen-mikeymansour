import { faker } from "@faker-js/faker";

export const generateRandomPostPayload = () => {
    return {
        title: faker.lorem.sentence(),
        views: faker.number.int({ min: 1, max: 1000 })
    };
};