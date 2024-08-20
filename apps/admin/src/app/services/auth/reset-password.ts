import { httpClient } from "../httpClient";

interface ResetPasswordParams {
	email: string;
	code: string;
	newPassword: string;
}

export type ResetPasswordFn = (params: ResetPasswordParams) => Promise<void>;

export async function resetPassword(params: ResetPasswordParams) {
	const { data } = await httpClient.post<void>("/auth/reset-password", params);

	return data;
}
