import type { IExerciseRepository } from "@application/database/repositories/exercises";
import type { IService } from "@application/interfaces/service";
import type { Exercise } from "@core/domain/exercise";
import * as z from "zod";

export const CreateInputServiceSchema = z.object({
	name: z.string(),
	equipment: z.enum(["Barra", "Halter", "Maquina"]),
	muscleGroup: z.string(),
	target: z.string().nullable(),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = Exercise;

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(private readonly exerciseRepository: IExerciseRepository) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const exercise = await this.exerciseRepository.create(createInput);

		return exercise;
	}
}
