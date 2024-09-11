import { MUTATION_KEYS } from "@/config/mutationKeys";
import type { ResearchQuestion } from "@/entitites/Question";
import { questionsService } from "@/services/questions";
import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "../types/useMutation";

export function useSendQuestion(options?: MutationOptions<ResearchQuestion>) {
	const { sendQuestions } = questionsService();

	const { mutateAsync, isPending } = useMutation<
		void,
		unknown,
		ResearchQuestion
	>({
		mutationKey: [MUTATION_KEYS.QUESTIONS],
		mutationFn: async (data) => sendQuestions(data),
		onSuccess: () => {
			if (options?.onSuccess) {
				options.onSuccess();
			}
		},
		onError: (error) => {
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
