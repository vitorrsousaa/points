import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import { z } from "zod";
import { UserNotFound } from "../../errors/user-not-found";

export const AccountStatusInputServiceSchema = z.object({
	email: z.string().email(),
});

export type TAccountStatus = z.infer<typeof AccountStatusInputServiceSchema>;

export type IAccountStatusInput = TAccountStatus;

export type IAccountStatusOutput = {
	accountConfirmation: boolean;
};

export type IAccountStatusService = IService<
	IAccountStatusInput,
	IAccountStatusOutput
>;

export class AccountStatusService implements IAccountStatusService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		accountStatusInput: IAccountStatusInput,
	): Promise<IAccountStatusOutput> {
		const { email } = accountStatusInput;

		const profile = await this.userRepository.getByEmail(email);

		if (!profile) {
			throw new UserNotFound();
		}

		return {
			accountConfirmation: profile.accountConfirmation,
		};
	}
}
