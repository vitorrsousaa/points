import { QUERY_KEYS } from "@/config/queryKeys";
import type { CustomExercise } from "@/entitites/exercise";
import { SentryHandler } from "@/libs/SentryHandler";
import { customExerciseServices } from "@/services/custom-exercise";
import { exerciseServices } from "@/services/exercise";
import type { WithStatus } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CustomExercisesQueryData = WithStatus<CustomExercise>[];

export function useCreateCustomExercise() {
	const { sendEvent, sendException } = SentryHandler();
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: customExerciseServices.create,
		onMutate: (variables) => {
			const tempId = Math.random().toString(36).substr(2, 9);

			queryClient.setQueryData<CustomExercisesQueryData>(
				QUERY_KEYS.CUSTOM_EXERCISES,
				(oldData) =>
					oldData?.concat({
						id: tempId,
						status: "pending",
						...variables,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					}),
			);

			return { tempId };
		},
		onSuccess: async (data, variables, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.CUSTOM_EXERCISES,
			});

			queryClient.setQueryData<CustomExercisesQueryData>(
				QUERY_KEYS.CUSTOM_EXERCISES,
				(oldData) =>
					oldData?.map((exercise) =>
						exercise.id === context?.tempId ? data : exercise,
					),
			);

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
		onError: async (error, _, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.CUSTOM_EXERCISES,
			});

			queryClient.setQueryData<CustomExercisesQueryData>(
				QUERY_KEYS.CUSTOM_EXERCISES,
				(oldData) =>
					oldData?.map((exercise) =>
						exercise.id === context?.tempId
							? { ...exercise, status: "error" }
							: exercise,
					),
			);

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
		exercises: data ?? [],
		isLoadingExercises: isLoading,
		isErrorExercises: isError,
	};
}

export function useGetAllCustomExercises() {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.CUSTOM_EXERCISES,
		queryFn: async () => {
			const exercises = await customExerciseServices.getAll();

			return exercises as WithStatus<CustomExercise>[];
		},
	});

	return {
		customExercises: data ?? [],
		isLoadingCustomExercises: isLoading,
		isErrorCustomExercises: isError,
	};
}
