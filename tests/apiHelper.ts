import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;
    private username: string;
    private token: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async login(request: APIRequestContext) {
        const response = await request.post(`${this.baseUrl}/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: `${process.env.TEST_USERNAME}`,
                password: `${process.env.TEST_PASSWORD}`
            })
        });
        const responseData = await response.json();
        console.log(responseData); // TA BORT!
        this.username = responseData.username;
        this.token = responseData.token;
        return response;
    };

    async getRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }
        });
        return response;
    };

    async createRoom(request: APIRequestContext, payload: object) {
        const response = await request.post(`${this.baseUrl}/room/new`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            },
            data: JSON.stringify(payload)
        });
        return response;
    };

    async getClients(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/clients`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }
        });
        return response;
    };

    async createClients(request: APIRequestContext, payload: object) {
        const response = await request.post(`${this.baseUrl}/client/new`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            },
            data: JSON.stringify(payload)
        });
        return response;
    }


};