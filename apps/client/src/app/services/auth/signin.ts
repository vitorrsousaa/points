import { SigninParams } from "@/entitites/Auth";
import { httpClient } from "../httpClient";

export async function signin(params: SigninParams) {
	const { data } = await httpClient.post<{ accessToken: string }>(
		"/auth/signin",
		params,
	);

	return data;
}
