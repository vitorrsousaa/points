import { httpClient } from "../httpClient";

type MeResponse = {
	email: string;
	name: string;
	id: string;
	role: string[];
};

export async function profile() {
	const { data } = await httpClient.get<MeResponse>("/auth/profile");

	return data;
}
