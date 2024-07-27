import type { CreateUserDTO } from "@application/shared/entity/user";

export type UpdatePasswordIdentityUserDTO = {
	email: string;
	newPassword: string;
	code: string;
};

export type TUserProfile = CreateUserDTO & {
	id: string;
};

export type TUserProfileOutput = CreateUserDTO & {
	id: string;
};

export interface IIdentityManagerProvider {
	signup(payload: CreateUserDTO): Promise<{ userId: string }>;
	accountConfirmation(email: string, code: string): Promise<void>;
	signin(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }>;
	forgotPassword(email: string): Promise<void>;
	profile(email: string): Promise<TUserProfileOutput>;
	resetPassword(payload: UpdatePasswordIdentityUserDTO): Promise<void>;
}
