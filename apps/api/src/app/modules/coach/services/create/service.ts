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

export const CreateInputServiceSchema = SignupInputSchema.omit({ role: true });

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = { userId: string };

export type ICreateService = IService<ICreateInput, ICreateOutput>;

const defaultAthlete: Omit<ICreateAthleteInput, "coachId" | "email"> = {
	age: 20,
	lastName: "Doe",
	firstName: "John",
	height: 180,
	weight: 80,
	athleteId: "1",
};

export class CreateService implements ICreateService {
	constructor(
		private readonly authSignup: ISignupService,
		private readonly createAthleteService: ICreateAthleteService,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const { userId } = await this.authSignup.execute({
			...createInput,
			role: ["COACH"],
		});

		await this.createAthleteService.execute({
			...defaultAthlete,
			coachId: userId,
			email: `${userId}@email.com`,
		});

		return {
			userId,
		};
	}
}
