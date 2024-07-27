import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";

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
	constructor(private readonly authProvider: IAuthProvider) {}

	async execute(signinInput: ISigninInput): Promise<ISigninOutput> {
		const { email, password } = signinInput;

		const { accessToken, refreshToken } = await this.authProvider.signin(
			email,
			password,
		);

		return { accessToken, refreshToken };
	}
}
