import { QUERY_KEYS } from "@/config/queryKeys";
import type { WorkoutReview } from "@/entitites/workout-review";
import { workoutReviewServices } from "@/services/workout-review";
import type { GetAllWorkoutReviewParams } from "@/services/workout-review/get-all";
import type { WithStatus } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useReviewedWorkoutReview({ coachId }: { coachId: string }) {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: workoutReviewServices.reviewed,
		onMutate: async (variables) => {
			const { workoutReview } = variables;

			const oldWorkoutReviews = queryClient.getQueryData<WorkoutReview[]>(
				QUERY_KEYS.WORKOUT_REVIEW(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId)),
			);

			queryClient.setQueryData<WorkoutReview[]>(
				QUERY_KEYS.WORKOUT_REVIEW(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId)),
				(oldData) =>
					oldData?.filter((review) => review.id !== workoutReview.id) ?? [],
			);

			return { oldWorkoutReviews, workoutReviewId: workoutReview.id };
		},
		onSuccess: async (_, variables) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUT_REVIEW(
					OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId),
				),
			});

			queryClient.setQueryData<WorkoutReview[]>(
				QUERY_KEYS.WORKOUT_REVIEW(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId)),
				(oldData) =>
					oldData?.filter(
						(review) => review.id !== variables.workoutReview.id,
					) ?? [],
			);
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.WORKOUT_REVIEW(
					OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId),
				),
			});

			queryClient.setQueryData<WithStatus<WorkoutReview>[]>(
				QUERY_KEYS.WORKOUT_REVIEW(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(coachId)),
				context?.oldWorkoutReviews?.map((workout) =>
					workout.id === context.workoutReviewId
						? { ...workout, status: "error" }
						: workout,
				),
			);
		},
	});

	return {
		reviewed: mutateAsync,
		isPendingReviewed: isPending,
	};
}
