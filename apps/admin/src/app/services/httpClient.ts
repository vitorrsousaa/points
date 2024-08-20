import { STORAGE_KEYS } from "@/config/storages";
import axios from "axios";
import { AppError } from "../errors/app-error";

const { VITE_API_BASE_URL } = import.meta.env;

export const httpClient = axios.create({
	baseURL: VITE_API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
	const storedAccessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

	if (storedAccessToken) {
		config.headers.Authorization = `Bearer ${storedAccessToken}`;
	}

	return config;
});

httpClient.interceptors.request.use((config) => {
	config.headers.set(
		"Access-Control-Allow-Origin",
		"https://admin.lalepratas925.com.br",
	);
	config.headers["Content-Type"] = "application/json";

	return config;
});

httpClient.interceptors.response.use(
	async (data) => {
		return data;
	},
	async (error) => {
		return Promise.reject(new AppError(error));
	},
);
