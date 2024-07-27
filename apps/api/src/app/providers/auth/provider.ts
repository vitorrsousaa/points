import type { CreateUserDTO } from "@application/shared/entity/user";
import type { IIdentityManagerProvider } from "../identityManager";
import type { IAuthProvider } from "./types";

export class AuthProvider implements IAuthProvider {
	constructor(
		private readonly identityManagerProvider: IIdentityManagerProvider,
	) {}

	async signup(payload: CreateUserDTO): Promise<{ userId: string }> {
		return this.identityManagerProvider.signup(payload);
	}

	async profile(userId: string): Promise<{
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}> {
		return this.identityManagerProvider.profile(userId);
	}

	async accountConfirmation(email: string, code: string): Promise<void> {
		return this.identityManagerProvider.accountConfirmation(email, code);
	}

	async signin(
		email: string,
		password: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		return this.identityManagerProvider.signin(email, password);
	}
}
