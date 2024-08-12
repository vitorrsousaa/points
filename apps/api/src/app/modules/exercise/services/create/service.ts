import type { IExerciseRepository } from "@application/database/repositories/exercises";
import type { IService } from "@application/interfaces/service";
import {
	CreateExerciseInputSchema,
	type Exercise,
} from "@core/domain/exercise";
import type * as z from "zod";

export const CreateInputServiceSchema = CreateExerciseInputSchema;

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
