import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";
import { AthleteNotActive } from "../../errors/athlete-not-active";
import { InvalidCredentials } from "../../errors/invalid-credentials";

export const SigninInputServiceSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8),
});

export type TSignin = z.infer<typeof SigninInputServiceSchema>;

export type ISigninInput = TSignin;

export interface ISigninOutput {
	accessToken: string;
	refreshToken: string;
}

export type ISigninService = IService<ISigninInput, ISigninOutput>;

export class SigninService implements ISigninService {
	constructor(
		private readonly authProvider: IAuthProvider,
		private readonly userRepository: IUserRepository,
		private readonly athleteRepository: IAthleteRepository,
	) {}

	async execute(signinInput: ISigninInput): Promise<ISigninOutput> {
		const { email, password } = signinInput;

		const userExists = await this.userRepository.getByEmail(email);

		if (!userExists) {
			throw new InvalidCredentials();
		}

		const userIsAthlete = userExists.role.includes("ATHLETE");

		if (userIsAthlete) {
			const athleteExists = await this.athleteRepository.getById(userExists.id);

			if (!athleteExists) {
				throw new InvalidCredentials();
			}

			const athleteIsActive = athleteExists.isActive;

			if (!athleteIsActive) {
				throw new AthleteNotActive();
			}
		}

		const { accessToken, refreshToken } = await this.authProvider.signin(
			email,
			password,
		);

		return { accessToken, refreshToken };
	}
}
