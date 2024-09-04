import type { IQuestionRepository } from "@application/database/repositories/questions";
import type { IService } from "@application/interfaces/service";
import { type Question, QuestionSchema } from "@core/domain/question";
import * as z from "zod";

export const CreateInputServiceSchema = z.object({
	userId: z.string().uuid(),
	questions: z.array(QuestionSchema.omit({ userId: true })),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = Question[];

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(private readonly questionRepository: IQuestionRepository) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const questionsToCreate = createInput.questions.map((question) => ({
			...question,
			userId: createInput.userId,
		}));

		const questions =
			await this.questionRepository.createLot(questionsToCreate);

		return questions;
	}
}
