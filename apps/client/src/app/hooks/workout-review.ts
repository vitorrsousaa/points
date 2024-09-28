import { QUERY_KEYS } from "@/config/queryKeys";
import { workoutReviewServices } from "@/services/workout-review";
import type { GetAllWorkoutReviewParams } from "@/services/workout-review/get-all";
import { useQuery } from "@tanstack/react-query";

export function useGetAllWorkoutReview(params: GetAllWorkoutReviewParams) {
	const { data, isLoading, isError } = useQuery({
		queryKey: QUERY_KEYS.WORKOUT_REVIEW(params),
		queryFn: async () => workoutReviewServices.getAll(params),
	});

	return {
		workoutReviews: data ?? [],
		isLoadingWorkoutReviews: isLoading,
		isErrorWorkoutReviews: isError,
	};
}
