import type { IExerciseRepository } from "@application/database/repositories/exercises";
import type { IService } from "@application/interfaces/service";
import type { Exercise } from "@core/domain/exercise";
import * as z from "zod";

// export const GetAllInputServiceSchema = z.object({
//   userId: z.string().uuid(),
//   patientId: z.string().uuid(),
// });

// export type TGetAll = z.infer<typeof GetAllInputServiceSchema>;

// export type IGetAllInput = TGetAll;

export type IGetAllOutput = Exercise[];

export type IGetAllService = IService<void, IGetAllOutput>;

export class GetAllService implements IGetAllService {
	constructor(private readonly exerciseRepository: IExerciseRepository) {}

	async execute(): Promise<IGetAllOutput> {
		return this.exerciseRepository.getAll();
	}
}
