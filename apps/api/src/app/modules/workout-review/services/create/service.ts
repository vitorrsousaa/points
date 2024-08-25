import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IService } from "@application/interfaces/service";
import { AthleteNotFound } from "@application/shared/errors/athlete-not-found";
import * as z from "zod";

export const CreateInputServiceSchema = z.object({
	athleteId: z.string().uuid(),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export interface ICreateOutput {
	name: string;
}

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(private athleteRepository: IAthleteRepository) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const { athleteId } = createInput;

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) {
			throw new AthleteNotFound();
		}

		const newWorkoutCount = athlete.workoutCount + 1;
		await this.athleteRepository.update({
			...athlete,
			workoutCount: newWorkoutCount,
		});

		return {
			name: "createInput.name",
		};
	}
}
