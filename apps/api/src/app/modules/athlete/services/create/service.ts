import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import { AppError } from "@application/errors/app-error";
import type { IService } from "@application/interfaces/service";
import type { ISignupService } from "@application/modules/auth/services/signup";
import { generateRandomPassword } from "@application/utils/generate-password";
import type { TRole } from "@core/domain/role";
import * as z from "zod";
import { CoachIsRequired } from "../../errors/coach-is-required";
import { CoachNotFound } from "../../errors/coach-not-found";

export const CreateInputServiceSchema = z.object({
	coachId: z.string().uuid(),
	firstName: z.string().min(3).max(255),
	lastName: z.string().min(3).max(255),
	email: z.string().email(),
	weight: z.number().min(1),
	height: z.number().min(1),
	age: z.number().min(1),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export interface ICreateOutput {
	name: string;
}

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(
		private readonly signupService: ISignupService,
		private readonly userRepository: IUserRepository,
		private readonly athleteRepository: IAthleteRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const coach = await this.userRepository.getById(createInput.coachId);

		if (!coach) {
			throw new CoachNotFound();
		}

		this.userIsCoach(coach.role);

		const { userId } = await this.signupService.execute({
			firstName: createInput.firstName,
			lastName: createInput.lastName,
			email: createInput.email,
			password: generateRandomPassword(),
			role: ["ATHLETE"],
		});

		const athlete = await this.athleteRepository.update({
			id: userId,
			coachId: createInput.coachId,
			weight: createInput.weight,
			height: createInput.height,
			age: createInput.age,
			accountConfirmation: false,
			email: createInput.email,
			name: `${createInput.firstName} ${createInput.lastName}`,
			role: ["ATHLETE"],
		});

		return athlete;
	}

	private userIsCoach(role: TRole) {
		if (!role.includes("COACH")) {
			throw new CoachIsRequired();
		}
	}
}
