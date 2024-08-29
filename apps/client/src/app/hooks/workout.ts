import { QUERY_KEYS } from "@/config/queryKeys";
import type { Workout } from "@/entitites/workout";
import { SentryHandler } from "@/libs/SentryHandler";
import { workoutServices } from "@/services/workout";
import type { WithStatus } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateWorkout() {
	const queryClient = useQueryClient();

	const { sendEvent, sendException } = SentryHandler();

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
						isActive: true,
					}),
			);

			return { tempId, athleteId };
		},
		onSuccess: async (data, variables, context) => {
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

			sendEvent({
				message: "UpdateWorkout",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
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

			sendException({
				exceptionName: "create_workout",
				..._error,
			});
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

export function useRemoveWorkout() {
	const queryClient = useQueryClient();

	const { sendEvent, sendException } = SentryHandler();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: workoutServices.remove,
		onMutate: (variables) => {
			const { athleteId, workoutId } = variables;

			const oldWorkouts = queryClient.getQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
			);

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				(old) => old?.filter((workout) => workout.id !== workoutId),
			);

			return { oldWorkouts, workoutId };
		},
		onSuccess: async (_, variables) => {
			const { athleteId, workoutId } = variables;

			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(athleteId),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				(old) => old?.filter((workout) => workout.id !== workoutId),
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
		onError: async (_error, variables, context) => {
			const { athleteId } = variables;
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(athleteId),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				context?.oldWorkouts?.map((workout) =>
					workout.id === context.workoutId
						? { ...workout, status: "error" }
						: workout,
				),
			);

			sendException({
				exceptionName: "remove_workout",
				..._error,
			});
		},
	});

	return {
		isRemovingWorkout: isPending,
		removeWorkout: mutateAsync,
	};
}

export function useUpdateWorkout() {
	const queryClient = useQueryClient();

	const { sendEvent, sendException } = SentryHandler();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: workoutServices.update,
		onMutate: (variables) => {
			const { athleteId, workout } = variables;

			const oldWorkouts = queryClient.getQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
			);

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				oldWorkouts?.map((w) =>
					w.id === workout.id ? { ...workout, status: "pending" } : w,
				),
			);

			return { oldWorkouts };
		},
		onSuccess: async (_, variables) => {
			const { athleteId, workout } = variables;

			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(athleteId),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				(old) => old?.map((w) => (w.id === workout.id ? workout : w)),
			);

			sendEvent({
				message: "UpdateWorkout",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError: async (error, variables, context) => {
			const { athleteId, workout } = variables;

			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUTS(athleteId),
			});

			queryClient.setQueryData<WithStatus<Workout>[]>(
				QUERY_KEYS.WORKOUTS(athleteId),
				context?.oldWorkouts?.map((w) =>
					w.id === workout.id ? { ...w, status: "error" } : w,
				),
			);

			sendException({
				exceptionName: "update_workout",
				...error,
			});
		},
	});

	return {
		updateWorkout: mutateAsync,
		isUpdatingWorkout: isPending,
	};
}
