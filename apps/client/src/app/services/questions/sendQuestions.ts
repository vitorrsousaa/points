import { ResearchQuestion } from "@/entitites/Question";
import { httpClient } from "../httpClient";

export function sendQuestions(question: ResearchQuestion) {
	return httpClient.post<void>("/question", question);
}
