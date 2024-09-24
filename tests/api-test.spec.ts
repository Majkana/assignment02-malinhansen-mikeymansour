import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('Hotel app - backend tests', () => {
    let apiHelper: APIHelper;

    test.beforeAll('login get access token', async ({ request }) => {
        apiHelper = new APIHelper(baseUrl);
        const login = await apiHelper.login(request);
        expect(login.status()).toBe(200);
    });

    test('get all rooms', async ({ request }) => {
        const getRooms = await apiHelper.getRoooms(request);
        expect(getRooms.ok()).toBeTruthy();
    });

    test('get all clients', async ({ request }) => {
        const getClients = await apiHelper.getClients(request);
        expect(getClients.ok()).toBeTruthy();
    });

});