import type { ResearchQuestion } from "@/entitites/Question";
import { httpClient } from "../httpClient";

export async function sendQuestions(question: ResearchQuestion) {
	const { data } = await httpClient.post<void>("/question", question);
	return data;
}
