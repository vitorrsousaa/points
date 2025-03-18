import type { Prettify } from "@application/utils/types";
import * as z from "zod";
import type { BaseEntity } from "../base";

export const CreateQuestionInputSchema = z.object({
	userId: z.string(),
	question: z.string(),
	answer: z.string(),
});

export const QuestionSchema = CreateQuestionInputSchema;

export type Question = Prettify<
	z.infer<typeof QuestionSchema> & Omit<BaseEntity, "updatedAt">
>;
