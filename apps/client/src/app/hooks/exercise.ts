import { QUERY_KEYS } from "@/config/queryKeys";
import { SentryHandler } from "@/libs/SentryHandler";
import { exerciseServices } from "@/services/exercise";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateExercise() {
	const { sendEvent, sendException } = SentryHandler();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: exerciseServices.create,
		onSuccess(_, variables) {
			sendEvent({
				message: "CreateExercise",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError(error) {
			sendException({
				exceptionName: "create_exercise",
				...error,
			});
		},
	});

	return {
		createExercise: mutateAsync,
		isCreatingExercise: isPending,
	};
}

export function useGetAllExercises() {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.EXERCISES,
		queryFn: exerciseServices.getAll,
	});

	return {
		exercises: data,
		isLoadingExercises: isLoading,
		isErrorExercises: isError,
	};
}
