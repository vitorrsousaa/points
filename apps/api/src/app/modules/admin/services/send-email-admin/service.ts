import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type {
	IEmailProvider,
	TemplatesIds,
} from "@application/providers/email";
import * as z from "zod";
import { UserNotAdmin } from "../../errors/user-not-admin";
import { UserNotFound } from "../../errors/user-not-found";

export const SendEmailAdminInputServiceSchema = z.object({
	userId: z.string().uuid(),
	audience: z.enum(["ALL", "COACH", "ATHLETE"]),
	templateId: z.custom<TemplatesIds>(),
});

export type TSendEmailAdmin = z.infer<typeof SendEmailAdminInputServiceSchema>;

export type ISendEmailAdminInput = TSendEmailAdmin;

export type ISendEmailAdminOutput = null;

export type ISendEmailAdminService = IService<
	ISendEmailAdminInput,
	ISendEmailAdminOutput
>;

export class SendEmailAdminService implements ISendEmailAdminService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly emailProvider: IEmailProvider,
	) {}

	async execute(
		sendEmailAdminInput: ISendEmailAdminInput,
	): Promise<ISendEmailAdminOutput> {
		const user = await this.userRepository.getById(sendEmailAdminInput.userId);

		if (!user) {
			throw new UserNotFound();
		}

		const userIsAdmin = user.role.includes("ADMIN");

		if (!userIsAdmin) {
			throw new UserNotAdmin();
		}

		const allUsers = await this.userRepository.getAll();

		const filteredUsers = allUsers.filter((user) => {
			if (sendEmailAdminInput.audience === "COACH") {
				return user.role.includes("COACH");
			}

			if (sendEmailAdminInput.audience === "ATHLETE") {
				return user.role.includes("ATHLETE");
			}

			return true;
		});

		if (filteredUsers.length === 0) {
			return null;
		}

		const template = this.emailProvider.getTemplate(
			sendEmailAdminInput.templateId,
		);

		return null;
	}
}
