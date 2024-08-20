import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type { ICreateSettingsService } from "@application/modules/settings/services/create";
import type { IAuthProvider } from "@application/providers/auth";
import { RoleSchema } from "@core/domain/user/role";
import * as z from "zod";

export const SignupInputSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8),
	role: RoleSchema,
});

export type TCreateUserDTO = z.infer<typeof SignupInputSchema>;

export type ISignupInput = TCreateUserDTO;

export interface ISignupOutput {
	userId: string;
}

export type ISignupService = IService<ISignupInput, ISignupOutput>;

export class SignupService implements ISignupService {
	constructor(
		private readonly authProvider: IAuthProvider,
		private readonly userRepository: IUserRepository,
		private readonly createSettingsService: ICreateSettingsService,
	) {}
	async execute(data: ISignupInput): Promise<ISignupOutput> {
		// this.verifyRoles(data.role, data);

		const { userId } = await this.authProvider.signup(data);

		await this.userRepository.create({
			id: userId,
			accountConfirmation: false,
			email: data.email,
			name: `${data.firstName} ${data.lastName}`,
			role: data.role,
		});

		await this.createSettingsService.execute({ userId });

		return { userId };
	}

	// private verifyRoles(role: TRole, object: Record<string, unknown>) {
	// 	if (role.includes("PATIENT")) {
	// 		if (!object.doctorId) {
	// 			throw new DoctorIsRequired();
	// 		}
	// 	}
	// }
}
