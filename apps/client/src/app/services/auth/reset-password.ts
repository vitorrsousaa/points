import type { ResetPasswordParams } from "@/entitites/Auth";
import { httpClient } from "../httpClient";

export async function resetPassword(params: ResetPasswordParams) {
	const { data } = await httpClient.post<void>("/auth/reset-password", params);

	return data;
}
