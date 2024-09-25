import { faker } from "@faker-js/faker";

export const generateRoomData = () => {
    const floorNumber = faker.number.int({ min: 1, max: 20 }).toString();
    const roomNumber = faker.number.int({ min: 1, max: 9 }).toString();
    const roomPrice = faker.number.int({ min: 1000, max: 30000 });
    const available = Math.random() < 0.5;

    const categoryOptions = ['double', 'single', 'twin'];
    // const numberOfCategoryOptions = categoryOptions.length;
    const category = faker.number.int({ min: 0, max: (categoryOptions.length - 1) });

    const featureOptions = ['balcony', 'ensuite', 'sea view', 'penthouse'];
    // const numberOfFeatureOptions = featureOptions.length;
    const numberOfFeatures = faker.number.int({ min: 1, max: featureOptions.length });
    const roomFeatures: any[] = [];
    for (let i = 0; i < (numberOfFeatures); i++) {
      let randomFeature = faker.number.int({ min: 0, max: (featureOptions.length - 1) });
      roomFeatures.push(featureOptions[randomFeature]);
      featureOptions.splice(randomFeature, 1);
    };

    return {
        category: categoryOptions[category],
        number: Number((floorNumber + 0 + roomNumber)),
        floor: Number(floorNumber),
        available: available,
        price: roomPrice,
        features: roomFeatures
    };
};