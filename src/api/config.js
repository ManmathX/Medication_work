const API_URL = 'http://10.254.204.117:5000/api';

export const api = {
    async getCars(searchQuery = '') {
        try {
            const url = searchQuery ? `${API_URL}/cars?search=${searchQuery}` : `${API_URL}/cars`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching cars:', error);
            return [];
        }
    },

    async getCarById(id) {
        try {
            const response = await fetch(`${API_URL}/cars/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching car:', error);
            return null;
        }
    },

    async sendChatMessage(message) {
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error sending chat message:', error);
            return 'Sorry, I could not process your request.';
        }
    },

    async register(email, password, name) {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering:', error);
            return { message: error.message };
        }
    },

    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            return { message: error.message };
        }
    }
};
