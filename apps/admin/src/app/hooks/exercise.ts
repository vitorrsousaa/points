import { QUERY_KEYS } from "@/config/queryKeys";
import { exerciseServices } from "@/services/exercise";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateExercise() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: exerciseServices.create,
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
