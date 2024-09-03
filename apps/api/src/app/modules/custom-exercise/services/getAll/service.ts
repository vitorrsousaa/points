import { ICustomExerciseRepository } from "@application/database/repositories/custom-exercises";
import type { IService } from "@application/interfaces/service";
import { CustomExercise } from "@core/domain/exercise";
import * as z from "zod";

export const GetAllInputServiceSchema = z.object({
	userId: z.string().uuid(),
});

export type TGetAll = z.infer<typeof GetAllInputServiceSchema>;

export type IGetAllInput = TGetAll;

export type IGetAllOutput = CustomExercise[];

export type IGetAllService = IService<IGetAllInput, IGetAllOutput>;

export class GetAllService implements IGetAllService {
	constructor(
		private readonly customExerciseRepository: ICustomExerciseRepository,
	) {}

	async execute(getAllInput: IGetAllInput): Promise<IGetAllOutput> {
		const customExercises = await this.customExerciseRepository.getAll(
			getAllInput.userId,
		);
		return customExercises;
	}
}
