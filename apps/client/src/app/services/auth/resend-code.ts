import { httpClient } from "../httpClient";

export async function resendCode(email: string) {
	const { data } = await httpClient.post<void>(`/auth/resend-code/${email}`);

	return data;
}
