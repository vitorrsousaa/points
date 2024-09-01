import type { IService } from "@application/interfaces/service";
import {
	type ISignupService,
	SignupInputSchema,
} from "@application/modules/auth/services/signup";
import type {
	ICreateService as ICreateAthleteService,
	ICreateInput as ICreateAthleteInput,
} from "@application/modules/athlete/services/create";
import type * as z from "zod";
import type { ICoachRepository } from "@application/database/repositories/coach";

export const CreateInputServiceSchema = SignupInputSchema.omit({ role: true });

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = { userId: string };

export type ICreateService = IService<ICreateInput, ICreateOutput>;

const defaultAthlete: Omit<ICreateAthleteInput, "coachId"> = {
	age: 20,
	lastName: "Doe",
	firstName: "John",
	height: 180,
	weight: 80,
	athleteId: "1",
	email: "john@email.com",
};

export class CreateService implements ICreateService {
	constructor(
		private readonly authSignup: ISignupService,
		private readonly createAthleteService: ICreateAthleteService,
		private readonly coachRepository: ICoachRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const { userId } = await this.authSignup.execute({
			...createInput,
			role: ["COACH"],
		});

		const name = `${createInput.firstName} ${createInput.lastName}`;

		await this.coachRepository.create({
			id: userId,
			name,
		});

		await this.createAthleteService.execute({
			...defaultAthlete,
			coachId: userId,
			email: "examplo@email.com",
		});

		return {
			userId,
		};
	}
}
