export interface SignupParams {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string[];
}

export interface SigninParams {
	email: string;
	password: string;
}

export interface AccountConfirmationParams {
	email: string;
	code: string;
}

export interface ForgotPasswordParams {
	email: string;
}

export interface ResetPasswordParams {
	email: string;
	code: string;
	newPassword: string;
}

export type AccountConfirmationFn = (
	params: AccountConfirmationParams,
) => Promise<void>;

export type ResetPasswordFn = (params: ResetPasswordParams) => Promise<void>;
