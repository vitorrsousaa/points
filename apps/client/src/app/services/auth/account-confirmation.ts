import { httpClient } from "../httpClient";

interface AccountConfirmationParams {
	email: string;
	code: string;
}

export type AccountConfirmationFn = (
	params: AccountConfirmationParams,
) => Promise<void>;

export async function accountConfirmation(params: AccountConfirmationParams) {
	const { data } = await httpClient.post<void>(
		"/auth/account-confirmation",
		params,
	);

	return data;
}
