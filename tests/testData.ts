import { faker } from "@faker-js/faker";

export class DataGenerator {
    generateRoomData = () => {
        const floorNumber = faker.number.int({ min: 1, max: 20 }).toString();
        const roomNumber = faker.number.int({ min: 1, max: 9 }).toString();
        const roomPrice = faker.number.int({ min: 1000, max: 30000 });
        const available = faker.datatype.boolean();

        const categoryOptions = ['double', 'single', 'twin'];
        const category = faker.number.int({ min: 0, max: (categoryOptions.length - 1) });

        const featureOptions = ['balcony', 'ensuite', 'sea view', 'penthouse'];
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

    generateClientData = () => {
        const email = faker.internet.email();
        const name = faker.person.fullName();
        const telephone = faker.phone.number();

        return {
            email: email,
            name: name,
            telephone: telephone
        };
    };

    generateBillData = () => {
        const value = faker.number.int({ min: 1, max: 20 });
        const paid = faker.datatype.boolean();

        return {
            value: value,
            paid: paid
        };
    };

    generateReservationData = (clientIds: Array<string>, roomIds: Array<string>, billIds: Array<string>) => {
        const clientId = Math.floor(Math.random() * clientIds.length);
        const roomId = Math.floor(Math.random() * roomIds.length);
        const billId = Math.floor(Math.random() * billIds.length);
        const startDate = faker.date.soon({ days: 365}).toLocaleDateString();
        const endDate = faker.date.soon({ days: 10, refDate: startDate}).toLocaleDateString();

        return {
            client: clientIds[clientId],
            room: roomIds[roomId],
            bill: billIds[billId],
            start: startDate,
            end: endDate
        };
    };
};