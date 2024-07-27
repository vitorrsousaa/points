import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import type { TRole } from "@core/domain/role";
import * as z from "zod";
import { DoctorIsRequired } from "../../errors/doctor-is-required";

export const SignupInputSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8),
	role: z.array(
		z.union([z.literal("PATIENT"), z.literal("DOCTOR"), z.literal("ADMIN")]),
	),
	doctorId: z.string().optional(),
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
	) {}
	async execute(data: ISignupInput): Promise<ISignupOutput> {
		this.verifyRoles(data.role, data);

		const { userId } = await this.authProvider.signup(data);

		const hasPatient = data.role.includes("PATIENT");

		await this.userRepository.create({
			id: userId,
			accountConfirmation: false,
			doctorId: hasPatient ? data.doctorId || null : null,
			email: data.email,
			name: `${data.firstName} ${data.lastName}`,
			role: data.role,
		});

		return { userId };
	}

	private verifyRoles(role: TRole, object: Record<string, unknown>) {
		if (role.includes("PATIENT")) {
			if (!object.doctorId) {
				throw new DoctorIsRequired();
			}
		}
	}
}
