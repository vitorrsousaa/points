import type { CreateUserDTO } from "@application/shared/entity/user";

export interface IAuthProvider {
	signup(payload: CreateUserDTO): Promise<{ userId: string }>;
	profile(userId: string): Promise<{
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}>;
	accountConfirmation(email: string, code: string): Promise<void>;
	signin(
		email: string,
		password: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}>;
}
