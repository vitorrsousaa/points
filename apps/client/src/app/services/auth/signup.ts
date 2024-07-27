import { httpClient } from "../httpClient";

export interface SignupParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string[];
}

export async function signup(params: SignupParams) {
	const { data } = await httpClient.post<{ userId: string }>(
		"/auth/signup",
		params,
	);

	return data;
}
