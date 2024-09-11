import type { AccountConfirmationParams } from "@/entitites/Auth";
import { httpClient } from "../httpClient";

export async function accountConfirmation(params: AccountConfirmationParams) {
	const { data } = await httpClient.post<void>(
		"/auth/account-confirmation",
		params,
	);

	return data;
}
