import { httpClient } from "../httpClient";

export interface SigninParams {
	email: string;
	password: string;
}

export async function signin(params: SigninParams) {
	const { data } = await httpClient.post<{ accessToken: string }>(
		"/auth/signin",
		params,
	);

	return data;
}
