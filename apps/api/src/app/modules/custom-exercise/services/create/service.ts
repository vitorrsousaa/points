import type { ICustomExerciseRepository } from "@application/database/repositories/custom-exercises";
import type { IService } from "@application/interfaces/service";
import {
	CreateCustomExerciseInputSchema,
	type CustomExercise,
} from "@core/domain/exercise";
import type * as z from "zod";

export const CreateInputServiceSchema = CreateCustomExerciseInputSchema;

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = CustomExercise;

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(
		private readonly customExerciseRepository: ICustomExerciseRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const customExercise =
			await this.customExerciseRepository.create(createInput);

		return customExercise;
	}
}
