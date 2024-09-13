import type { IQuestionRepository } from "@application/database/repositories/questions";
import type { IService } from "@application/interfaces/service";
import type { Question } from "@core/domain/question";
import * as z from "zod";

export const GetAllInputServiceSchema = z.object({
	userId: z.string().uuid(),
});

export type TGetAll = z.infer<typeof GetAllInputServiceSchema>;

export type IGetAllInput = TGetAll;

export type IGetAllOutput = Question[];

export type IGetAllService = IService<IGetAllInput, IGetAllOutput>;

export class GetAllService implements IGetAllService {
	constructor(private readonly questionRepository: IQuestionRepository) {}

	async execute(getAllInput: IGetAllInput): Promise<IGetAllOutput> {
		const questions = await this.questionRepository.getAll();

		return questions;
	}
}
