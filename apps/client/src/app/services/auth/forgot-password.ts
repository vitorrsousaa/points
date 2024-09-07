import { ForgotPasswordParams } from "@/entitites/Auth";
import { httpClient } from "../httpClient";

export async function forgotPassword(params: ForgotPasswordParams) {
	const { data } = await httpClient.post<void>("/auth/forgot-password", params);

	return data;
}
