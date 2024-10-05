import { HeaderScreen } from "@shared/ui";
import { WorkoutReviewContextProvider } from "./UpdateWorkoutReviewContext";
import { CardExercise } from "./components/CardExercises";
import { CardVolume } from "./components/CardVolume";
import { CardWorkoutHeader } from "./components/CardWorkoutHeader";

export function UpdateWorkoutReview() {
	return (
		<div>
			<HeaderScreen
				title="Revisão de treino"
				description="Realize a revisão do treino do seu atleta."
			/>
			<WorkoutReviewContextProvider>
				<CardWorkoutHeader />

				<hr className="mt-6 mb-6" />

				<CardVolume />
				<hr className="mt-4 mb-4" />
				<CardExercise />
			</WorkoutReviewContextProvider>
		</div>
	);
}
