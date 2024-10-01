import { QUERY_KEYS } from "@/config/queryKeys";
import { workoutReviewServices } from "@/services/workout-review";
import type { GetAllWorkoutReviewParams } from "@/services/workout-review/get-all";
import { useQuery } from "@tanstack/react-query";

export const OPTIONS_WORKOUT_REVIEW = {
	NOT_REVIEWED: (coachId: string) => ({ coachId, limit: 10, reviewed: false }),
};

export function useGetAllWorkoutReview(params: GetAllWorkoutReviewParams) {
	const { data, isLoading, isError, refetch, isPending, isFetching } = useQuery(
		{
			queryKey: QUERY_KEYS.WORKOUT_REVIEW(params),
			queryFn: async () => workoutReviewServices.getAll(params),
		},
	);

	return {
		workoutReviews: data ?? [],
		isLoadingWorkoutReviews: isLoading,
		isErrorWorkoutReviews: isError,
		refetchWorkoutReviews: refetch,
		isFetchingWorkoutReviews: isFetching || isPending,
	};
}

export function useGetWorkoutReviewById(
	workoutReviewId: string,
	params: GetAllWorkoutReviewParams,
) {
	const { isErrorWorkoutReviews, isLoadingWorkoutReviews, workoutReviews } =
		useGetAllWorkoutReview(params);

	const workoutReview = workoutReviews?.find(
		(review) => review.id === workoutReviewId,
	);

	return {
		workoutReview: workoutReview ?? null,
		isLoadingWorkoutReview: isLoadingWorkoutReviews,
		isErrorWorkoutReview: isErrorWorkoutReviews,
	};
}
