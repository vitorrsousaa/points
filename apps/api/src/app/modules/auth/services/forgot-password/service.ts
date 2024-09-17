import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";

export const ForgotPasswordInputServiceSchema = z.object({
	email: z.string().email(),
});

export type TForgotPassword = z.infer<typeof ForgotPasswordInputServiceSchema>;

export type IForgotPasswordInput = TForgotPassword;

export type IForgotPasswordOutput = null;
export type IForgotPasswordService = IService<
	IForgotPasswordInput,
	IForgotPasswordOutput
>;

export class ForgotPasswordService implements IForgotPasswordService {
	constructor(private readonly authProvider: IAuthProvider) {}

	async execute(
		forgotPasswordInput: IForgotPasswordInput,
	): Promise<IForgotPasswordOutput> {
		await this.authProvider.forgotPassword(forgotPasswordInput.email);

		return null;
	}
}
