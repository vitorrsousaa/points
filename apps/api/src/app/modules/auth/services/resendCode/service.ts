import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";

export const ResendCodeInputServiceSchema = z.object({
	email: z.string().email(),
});

export type TResendCode = z.infer<typeof ResendCodeInputServiceSchema>;

export type IResendCodeInput = TResendCode;

export type IResendCodeOutput = never;

export type IResendCodeService = IService<IResendCodeInput, void>;

export class ResendCodeService implements IResendCodeService {
	constructor(private readonly authProvider: IAuthProvider) {}

	async execute(resendCodeInput: IResendCodeInput): Promise<void> {
		return this.authProvider.resendCode(resendCodeInput.email);
	}
}
