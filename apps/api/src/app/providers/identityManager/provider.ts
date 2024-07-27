import type { IConfig } from "@application/config/environment";
import { AppError } from "@application/errors/app-error";
import type { ICognitoIdentityProvider } from "@application/libs/cognitoClient";
import type { CreateUserDTO } from "@application/shared/entity/user";
import {
	AdminGetUserCommand,
	ConfirmForgotPasswordCommand,
	ConfirmSignUpCommand,
	ExpiredCodeException,
	ForgotPasswordCommand,
	InitiateAuthCommand,
	InvalidPasswordException,
	NotAuthorizedException,
	SignUpCommand,
	UserNotConfirmedException,
	UserNotFoundException,
	UsernameExistsException,
} from "@aws-sdk/client-cognito-identity-provider";
import type {
	IIdentityManagerProvider,
	TUserProfile,
	TUserProfileOutput,
	UpdatePasswordIdentityUserDTO,
} from "./types";

export class IdentityManagerProvider implements IIdentityManagerProvider {
	private COGNITO_POOL_CLIENT_ID;
	constructor(
		private readonly cognitoClient: ICognitoIdentityProvider,
		private readonly configEnvironment: IConfig,
	) {
		this.COGNITO_POOL_CLIENT_ID = configEnvironment.COGNITO_POOL_CLIENT_ID;
	}

	async signup(payload: CreateUserDTO): Promise<{ userId: string }> {
		const { email, firstName, lastName, password } = payload;

		try {
			const command = new SignUpCommand({
				ClientId: this.configEnvironment.COGNITO_POOL_CLIENT_ID,
				Username: email,
				Password: password,
				UserAttributes: [
					{
						Name: "given_name",
						Value: firstName,
					},
					{
						Name: "family_name",
						Value: lastName,
					},
				],
			});

			const { UserSub } = await this.cognitoClient.send(command);

			return {
				userId: UserSub as string,
			};
		} catch (error) {
			if (error instanceof UsernameExistsException) {
				throw new AppError("Username already exists", 409);
			}

			if (error instanceof InvalidPasswordException) {
				throw new AppError("Invalid Password", 400);
			}

			throw new AppError("Internal Server Error", 500);
		}
	}

	async accountConfirmation(email: string, code: string): Promise<void> {
		try {
			const command = new ConfirmSignUpCommand({
				ClientId: this.COGNITO_POOL_CLIENT_ID,
				Username: email,
				ConfirmationCode: code,
			});

			await this.cognitoClient.send(command);
		} catch (error) {
			if (error instanceof ExpiredCodeException) {
				throw new AppError("Expired Code", 400);
			}
			if (error instanceof NotAuthorizedException) {
				throw new AppError("Not Authorized", 401);
			}

			if (error instanceof UserNotFoundException) {
				throw new AppError("User not found", 404);
			}

			throw new AppError("Internal Server Error", 500);
		}
	}

	async signin(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		try {
			const command = new InitiateAuthCommand({
				ClientId: this.COGNITO_POOL_CLIENT_ID,
				AuthFlow: "USER_PASSWORD_AUTH",
				AuthParameters: {
					USERNAME: email,
					PASSWORD: password,
				},
			});

			const { AuthenticationResult } = await this.cognitoClient.send(command);

			if (!AuthenticationResult) {
				throw new AppError("Invalid Credentials", 401);
			}

			return {
				accessToken: AuthenticationResult.AccessToken as string,
				refreshToken: AuthenticationResult.RefreshToken as string,
			};
		} catch (error) {
			if (error instanceof UserNotFoundException) {
				throw new AppError("Invalid Credentials", 401);
			}
			if (error instanceof NotAuthorizedException) {
				throw new AppError("Invalid Credentials", 401);
			}
			if (error instanceof UserNotConfirmedException) {
				throw new AppError(
					"You need to confirm your account before sign in.",
					401,
				);
			}

			throw new AppError("Internal Server Error", 500);
		}
	}

	async profile(userId: string): Promise<TUserProfileOutput> {
		try {
			const command = new AdminGetUserCommand({
				Username: userId,
				UserPoolId: this.configEnvironment.COGNITO_POOL_ID,
			});

			const { UserAttributes } = await this.cognitoClient.send(command);

			const profile = UserAttributes?.reduce((acc, { Name, Value }) => {
				const keyMap: Record<string, keyof TUserProfile> = {
					given_name: "firstName",
					family_name: "lastName",
					sub: "id",
				};

				return {
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					...acc,
					[keyMap[Name as keyof typeof keyMap] ?? Name]: Value,
				};
			}, {} as TUserProfile);

			if (!profile) {
				throw new AppError("User not found", 404);
			}

			return profile;
		} catch (error) {
			throw new AppError("Internal Server Error", 500);
		}
	}

	async forgotPassword(email: string): Promise<void> {
		try {
			const command = new ForgotPasswordCommand({
				ClientId: this.COGNITO_POOL_CLIENT_ID,
				Username: email,
			});

			await this.cognitoClient.send(command);
		} catch (error) {
			if (error instanceof UserNotFoundException) {
				throw new AppError("User not found", 404);
			}

			throw new AppError("Internal Server Error", 500);
		}
	}

	async resetPassword(user: UpdatePasswordIdentityUserDTO): Promise<void> {
		const { code, email, newPassword } = user;

		try {
			const command = new ConfirmForgotPasswordCommand({
				ClientId: this.COGNITO_POOL_CLIENT_ID,
				Username: email,
				ConfirmationCode: code,
				Password: newPassword,
			});

			await this.cognitoClient.send(command);
		} catch (error) {
			console.log(error);
			if (error instanceof ExpiredCodeException) {
				throw new AppError("Expired code", 400);
			}
			if (error instanceof UserNotFoundException) {
				throw new AppError("User not found", 401);
			}
			if (error instanceof UserNotConfirmedException) {
				throw new AppError("User not confirmed", 401);
			}

			throw new AppError("Internal Server Error", 500);
		}
	}
}
