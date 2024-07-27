import { httpClient } from "../httpClient";

type MeResponse = {
	email: string;
	firstName: string;
	lastName: string;
};

export async function profile() {
	const { data } = await httpClient.get<MeResponse>("/auth/profile");

	return data;
}
