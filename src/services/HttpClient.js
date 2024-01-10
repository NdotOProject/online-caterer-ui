import axios from "axios";

export const instance = axios.create({
	baseURL: 'https://localhost:7296/api/',
	timeout: 1000,
});
