import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Question } from "@core/domain/question";

export type QuestionDynamoDB = Prettify<
	{
		created_at: string;
		user_id: string;
	} & TBaseEntity &
		Omit<Question, "createdAt" | "userId">
>;

export interface IQuestionRepository {
	create(createInput: Omit<Question, "createdAt" | "id">): Promise<Question>;
	getAll(): Promise<Question[]>;
	createLot(
		createInput: Omit<Question, "createdAt" | "id">[],
	): Promise<Question[]>;
}
