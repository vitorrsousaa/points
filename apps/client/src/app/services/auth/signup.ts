import type { SignupParams } from "@/entitites/Auth";
import { httpClient } from "../httpClient";

export async function signup(params: SignupParams) {
	const { data } = await httpClient.post<{ userId: string }>("/coach", params);

	return data;
}
