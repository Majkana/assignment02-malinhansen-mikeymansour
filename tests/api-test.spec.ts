import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { generateRoomData } from './testData';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('Hotel app - backend tests', () => {
    let apiHelper: APIHelper;

    test.beforeAll('login, get access token', async ({ request }) => {
        apiHelper = new APIHelper(baseUrl);
        const login = await apiHelper.login(request);
        expect(login.status()).toBe(200);
    });

    test('get all rooms', async ({ request }) => {
        const getRooms = await apiHelper.getRoooms(request);
        expect(getRooms.status()).toBe(200);
    });

    test('create room', async ({ request }) => {
        const payload = generateRoomData()
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

        const getRooms = await apiHelper.getRoooms(request);
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

    test('get all clients', async ({ request }) => {
        const getClients = await apiHelper.getClients(request);
        expect(getClients.ok()).toBeTruthy();
    });

});