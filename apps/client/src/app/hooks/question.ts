import { MUTATION_KEYS } from "@/config/mutationKeys";
import { ResearchQuestion } from "@/entitites/Question";
import { questionsService } from "@/services/questions";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MutationOptions } from "../types/useMutation";

export function useSendQuestion(options?: MutationOptions<ResearchQuestion>) {
	const { sendQuestions } = questionsService();

	const { mutateAsync, isPending } = useMutation<
		AxiosResponse<void>,
		unknown,
		ResearchQuestion
	>({
		mutationKey: [MUTATION_KEYS.QUESTIONS],
		mutationFn: (data) => sendQuestions(data),
		onSuccess() {
			if (options?.onSuccess) {
				options.onSuccess();
			}
		},
		onError(error) {
			if (options?.onError) {
				options.onError(error || "Ocorreu um erro ao enviar as informações.");
			}
		},
	});

	return {
		send: mutateAsync,
		isLoading: isPending,
	};
}
