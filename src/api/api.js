class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async get(url) {
        return fetch(this._baseUrl + url, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Get error: ${res.status}`);
        })
    }

    async post(url, data) {
        return fetch(this._baseUrl + url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Post error: ${res.status}`);
        })
    }

    async delete(url) {
        const res = await fetch(this._baseUrl + url, {
            method: 'DELETE',
            headers: this._headers
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Delete error: ${res.status}`);
    }
}

export const api = new Api({
    baseUrl: '', // I'll add the server URL later
    headers: {
        authorization
    }
});