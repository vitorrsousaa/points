import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";
import { UserNotFound } from "../../errors/user-not-found";

export const AccountConfirmationInputServiceSchema = z.object({
	code: z.string().min(6),
	email: z.string().email({ message: "Invalid email" }),
});

export type TAccountConfirmation = z.infer<
	typeof AccountConfirmationInputServiceSchema
>;

export type IAccountConfirmationInput = TAccountConfirmation;

export type IAccountConfirmationOutput = null;

export type IAccountConfirmationService = IService<
	IAccountConfirmationInput,
	IAccountConfirmationOutput
>;

export class AccountConfirmationService implements IAccountConfirmationService {
	constructor(
		private readonly authProvider: IAuthProvider,
		private readonly userRepository: IUserRepository,
	) {}

	async execute(
		accountConfirmationInput: IAccountConfirmationInput,
	): Promise<IAccountConfirmationOutput> {
		const { code, email } = accountConfirmationInput;

		const userExists = await this.userRepository.getByEmail(email);

		if (!userExists) throw new UserNotFound();

		await this.authProvider.accountConfirmation(email, code);

		await this.userRepository.update(userExists.id, {
			...userExists,
			accountConfirmation: true,
		});

		return null;
	}
}
