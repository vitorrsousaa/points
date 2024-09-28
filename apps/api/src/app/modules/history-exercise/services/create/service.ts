import type { IHistoryExerciseRepository } from "@application/database/repositories/history-exercise";
import type { IService } from "@application/interfaces/service";
import {
	CreateHistoryExerciseSchema,
	type HistoryExercise,
} from "@core/domain/history-exercise";
import type * as z from "zod";

export const CreateInputServiceSchema = CreateHistoryExerciseSchema;

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = HistoryExercise;

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(
		private readonly historyExerciseRepository: IHistoryExerciseRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		return this.historyExerciseRepository.create(createInput);
	}
}
