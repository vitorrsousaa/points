import { exerciseServices } from "@/services/exercise";
import { useMutation } from "@tanstack/react-query";

export function useCreateExercise() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: exerciseServices.create,
	});

	return {
		createExercise: mutateAsync,
		isCreatingExercise: isPending,
	};
}
