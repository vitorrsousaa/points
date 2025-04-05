import { ICustomExerciseRepository } from "@application/database/repositories/custom-exercises";
import type { IExerciseRepository } from "@application/database/repositories/exercises";
import type { IService } from "@application/interfaces/service";
import type { IGetAllService as IGetAllCustomExerciseService } from "@application/modules/custom-exercise/services/getAll";
import type { CustomExercise, Exercise } from "@core/domain/exercise";
import * as z from "zod";

export const GetAllInputServiceSchema = z.object({
	coachId: z.string().uuid(),
});

export type TGetAll = z.infer<typeof GetAllInputServiceSchema>;

export type IGetAllInput = TGetAll;

export type IGetAllOutput = Exercise[];

export type IGetAllService = IService<IGetAllInput, IGetAllOutput>;

export class GetAllService implements IGetAllService {
	constructor(
		private readonly exerciseRepository: IExerciseRepository,
		private readonly customExerciseService: IGetAllCustomExerciseService,
	) {}

	async execute(getAllInput: IGetAllInput): Promise<IGetAllOutput> {
		const exercises = await this.exerciseRepository.getAll();

		const customExercises = await this.customExerciseService.execute({
			userId: getAllInput.coachId,
		});

		const allExercises = [...exercises, ...customExercises];

		return allExercises.map(this.mapToExercise);
	}

	private mapToExercise(item: Exercise | CustomExercise): Exercise {
		return {
			id: item.id,
			equipment: item.equipment,
			name: item.name,
			primaryMuscle: item.primaryMuscle,
			secondaryMuscle: item.secondaryMuscle,
			target: item.target,
		};
	}
}
