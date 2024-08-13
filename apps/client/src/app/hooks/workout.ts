import { QUERY_KEYS } from "@/config/queryKeys";
import { workoutServices } from "@/services/workout";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateWorkout() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: workoutServices.create,
	});

	return {
		createWorkout: mutateAsync,
		isCreatingWorkout: isPending,
	};
}

export function useGetAllWorkouts(athleteId: string | undefined) {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.WORKOUTS,
		queryFn: async () => {
			const workouts = await workoutServices.getAll({
				athleteId: athleteId || "",
			});

			return workouts;
		},
	});

	return {
		workouts: data,
		isLoadingWorkouts: isLoading,
		isErrorWorkouts: isError,
	};
}
