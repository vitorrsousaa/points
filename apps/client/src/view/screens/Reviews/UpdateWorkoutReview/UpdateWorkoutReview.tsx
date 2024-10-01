import { useAuth } from "@/hooks/auth";
import {
	OPTIONS_WORKOUT_REVIEW,
	useGetWorkoutReviewById,
} from "@/hooks/workout-review";
import { HeaderScreen } from "@shared/ui";
import { useParams } from "react-router-dom";

export function UpdateWorkoutReview() {
	const { id } = useAuth();

	const { workoutReviewId } = useParams<{ workoutReviewId: string }>();

	useGetWorkoutReviewById(
		workoutReviewId ?? "",
		OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(id || ""),
	);

	return (
		<div>
			<HeaderScreen
				title="Revisões de treino"
				description="Realize a revisão do treino do seu atleta."
			/>
		</div>
	);
}
