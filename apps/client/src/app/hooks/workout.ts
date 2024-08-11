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

export function useGetAllExercises() {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.EXERCISES,
		queryFn: workoutServices.getAll,
	});

	return {
		exercises: data,
		isLoadingExercises: isLoading,
		isErrorExercises: isError,
	};
}
