import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IService } from "@application/interfaces/service";
import { AthleteNotFound } from "@application/shared/errors/athlete-not-found";
import type { Athlete } from "@core/domain/athlete";
import * as z from "zod";

export const UpdateInputServiceSchema = z.object({
	coachId: z.string().uuid(),
	id: z.string().uuid(),
	age: z.number(),
	height: z.number().positive(),
	weight: z.number().positive(),
	workoutCount: z.number().positive(),
	isActive: z.boolean(),
});

export type TUpdate = z.infer<typeof UpdateInputServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = Athlete;

export type IUpdateService = IService<IUpdateInput, IUpdateOutput>;

export class UpdateService implements IUpdateService {
	constructor(private readonly athleteRepository: IAthleteRepository) {}

	async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
		const athlete = await this.athleteRepository.getById(updateInput.id);

		if (!athlete) throw new AthleteNotFound();

		const updateAthlete = await this.athleteRepository.update({
			...athlete,
			age: updateInput.age,
			weight: updateInput.weight,
			height: updateInput.height,
			workoutCount: updateInput.workoutCount,
			isActive: updateInput.isActive,
		});

		return updateAthlete;
	}
}
