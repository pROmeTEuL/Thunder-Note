class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    async get(url) {
        const res = await fetch(this._baseUrl + url);
        if (res.ok) {
            const data = await res.json();
            return data;
        }
        throw new Error(`Get error: ${res.status}`);
    }

    async post(url, data) {
        const res = await fetch(this._baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const responseData = await res.json();
            return responseData;
        }
        throw new Error(`Post error: ${res.status}`);
    }

    async delete(url) {
        const res = await fetch(this._baseUrl + url, {
            method: 'DELETE',
        });
        if (res.ok) {
            const responseData = await res.json();
            return responseData;
        }
        throw new Error(`Delete error: ${res.status}`);
    }
}

export const api = new Api({
    baseUrl: 'http://localhost:8000/', // I'll add the server URL later
});