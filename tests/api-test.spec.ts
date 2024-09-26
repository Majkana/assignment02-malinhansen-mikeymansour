import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { DataGenerator } from './testData';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('Hotel app - backend tests', () => {
    let apiHelper: APIHelper;
    let dataGenerator: DataGenerator;

    // Login section
    test.beforeAll('login, get access token', async ({ request }) => {
        apiHelper = new APIHelper(baseUrl);
        dataGenerator = new DataGenerator();
        const login = await apiHelper.login(request);
        expect(login.status()).toBe(200);
    });


    // Rooms section
    test('Test 1 - get all rooms', async ({ request }) => {
        const getRooms = await apiHelper.getRooms(request);
        expect(getRooms.status()).toBe(200);
    });

    test('Test 2 - test', async ({ request }) => {
        const getRoom = await apiHelper.getRoomById(request, '5');
        expect(getRoom.ok()).toBeFalsy();
    });


    test('Test 3 - create room', async ({ request }) => {
        const payload = dataGenerator.generateRoomData();
        const createRoom = await apiHelper.createRoom(request, payload);
        expect(createRoom.ok()).toBeTruthy();
        expect(await createRoom.json()).toMatchObject(
            expect.objectContaining({
                category: payload.category,
                number: payload.number,
                floor: payload.floor,
                available: payload.available,
                price: payload.price,
                features: payload.features
            })
        );

        const getRooms = await apiHelper.getRooms(request);
        expect(await getRooms.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    category: payload.category,
                    number: payload.number,
                    floor: payload.floor,
                    available: payload.available,
                    price: payload.price,
                    features: payload.features
                }),
            ]));

        console.log(await getRooms.json());
    });


    // Clients section
    test('Test 4 - get all clients', async ({ request }) => {
        const getClients = await apiHelper.getClients(request);
        expect(getClients.ok()).toBeTruthy();
    });


    test('Test 5 - create new client', async ({ request }) => {
        const payload = dataGenerator.generateClientData();
        const createClient = await apiHelper.createClients(request, payload);
        expect(createClient.ok()).toBeTruthy();
        expect(await createClient.json()).toMatchObject({
            email: payload.email,
            name: payload.name,
            telephone: payload.telephone
        })

        const getClients = await apiHelper.getClients(request);
        expect(await getClients.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: payload.email,
                    name: payload.name,
                    telephone: payload.telephone
                }),
            ]));
    });

    test('Test 6 - delete client', async ({ request }) => {
        const getClients = await apiHelper.getClients(request);
        const allClients = await getClients.json();
        const penultimateClientId = allClients[allClients.length - 2].id;

        const deleteClient = await apiHelper.deleteClient(request, penultimateClientId);
        expect(deleteClient.ok()).toBeTruthy();
        const getClientById = await apiHelper.getClientById(request, penultimateClientId);
        expect(getClientById.status()).toBe(401); // Borde vara 404??? Kolla mot 401. IRL kolla med teamet.
    });

    // Bills section
    test('Test 7 - get all bills', async ({ request }) => {
        const getBills = await apiHelper.getBills(request);
        expect(getBills.ok()).toBeTruthy();
    });

    test('Test 8 - create new bill', async ({ request }) => {
        const payload = dataGenerator.generateBillData();
        const createBills = await apiHelper.createBills(request, payload);
        expect(createBills.ok()).toBeTruthy();
        expect(await createBills.json()).toMatchObject({
            value: payload.value,
            paid: payload.paid
        })

        const getBills = await apiHelper.getBills(request);
        expect(await getBills.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: payload.value,
                    paid: payload.paid
                }),
            ]));
    });

    // Reservations section
    test('Test 9 - create reservation', async ({ request }) => {
        const getClients = await apiHelper.getClients(request);
        const clientsData = await getClients.json();
        let clientIds = clientsData.map(({ id }) => id);

        const getRooms = await apiHelper.getRooms(request);
        const roomsData = await getRooms.json();
        let roomIds = roomsData.map(({ id }) => id);

        const getBills = await apiHelper.getBills(request);
        const billsData = await getBills.json();
        let billIds = billsData.map(({ id }) => id);

        const payload = dataGenerator.generateReservationData(clientIds, roomIds, billIds);
        const createReservation = await apiHelper.createReservation(request, payload);
        expect(createReservation.ok()).toBeTruthy();
        expect(await createReservation.json()).toMatchObject({
            client: payload.client,
            room: payload.room,
            bill: payload.bill,
            start: payload.start,
            end: payload.end
        });

        const getReservations = await apiHelper.getReservations(request);
        expect(await getReservations.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    client: payload.client,
                    room: payload.room,
                    bill: payload.bill,
                    start: payload.start,
                    end: payload.end
                }),
            ]));
    });

});