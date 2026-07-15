const BASE_URL = "http://localhost:5000/api";

const API = {

    async get(endpoint) {

        const response = await fetch(`${BASE_URL}${endpoint}`);

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Something went wrong");

        }

        return data;

    },

    async post(endpoint, body) {

        const response = await fetch(`${BASE_URL}${endpoint}`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Something went wrong");

        }

        return data;

    },

    async put(endpoint, body) {

        const response = await fetch(`${BASE_URL}${endpoint}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Something went wrong");

        }

        return data;

    },

    async delete(endpoint) {

        const response = await fetch(`${BASE_URL}${endpoint}`, {

            method: "DELETE"

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Something went wrong");

        }

        return data;

    }

};