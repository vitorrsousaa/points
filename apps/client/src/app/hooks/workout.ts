import { QUERY_KEYS } from "@/config/queryKeys";
import type { Workout } from "@/entitites/workout";
import { workoutServices } from "@/services/workout";
import type { WithStatus } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateWorkout() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: workoutServices.create,
		onMutate: (variables) => {
			const { athleteId, workout } = variables;
			const { exercises, name } = workout;
			const tempId = Math.random().toString(36).substr(2, 9);

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				(oldData) =>
					oldData?.concat({
						id: tempId,
						status: "pending",
						name,
						exercises,
					}),
			);

			return { tempId, athleteId };
		},
		onSuccess: async (data, _, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(context?.athleteId),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(context?.athleteId),
				(oldData) =>
					oldData?.map((workout) =>
						workout.id === context?.tempId ? data : workout,
					),
			);
		},
		onError: async (_error, _, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(context?.athleteId || ""),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(context?.athleteId || ""),
				(old) =>
					old?.map((workout) =>
						workout.id === context?.tempId
							? { ...workout, status: "error" }
							: workout,
					),
			);
		},
	});

	return {
		createWorkout: mutateAsync,
		isCreatingWorkout: isPending,
	};
}

export function useGetAllWorkouts(athleteId: string | undefined) {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.WORKOUTS(athleteId || ""),
		queryFn: async () => {
			const workouts = await workoutServices.getAll({
				athleteId: athleteId || "",
			});

			return workouts as WithStatus<Workout>[];
		},
	});

	return {
		workouts: data,
		isLoadingWorkouts: isLoading,
		isErrorWorkouts: isError,
	};
}
