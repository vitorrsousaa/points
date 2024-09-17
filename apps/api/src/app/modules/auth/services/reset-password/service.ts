import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";

export const ResetPasswordInputServiceSchema = z.object({
	email: z.string().email(),
	code: z.string(),
	newPassword: z.string().min(8),
});

export type TResetPassword = z.infer<typeof ResetPasswordInputServiceSchema>;

export type IResetPasswordInput = TResetPassword;

export type IResetPasswordOutput = null;

export type IResetPasswordService = IService<
	IResetPasswordInput,
	IResetPasswordOutput
>;

export class ResetPasswordService implements IResetPasswordService {
	constructor(private readonly authProvider: IAuthProvider) {}

	async execute(
		resetPasswordInput: IResetPasswordInput,
	): Promise<IResetPasswordOutput> {
		const { email, code, newPassword } = resetPasswordInput;

		await this.authProvider.resetPassword({ email, code, newPassword });

		return null;
	}
}
