import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	HeaderScreen,
} from "@shared/ui";
import { WorkoutReviewContextProvider } from "./UpdateWorkoutReviewContext";
import { CardVolume } from "./components/CardVolume";

export function UpdateWorkoutReview() {
	return (
		<div>
			<HeaderScreen
				title="Revisão de treino"
				description="Realize a revisão do treino do seu atleta."
			/>
			<WorkoutReviewContextProvider>
				<Card>
					<CardHeader>
						<CardTitle>Atleta: João Pedro</CardTitle>
						<CardDescription>Peso: 84kg</CardDescription>
					</CardHeader>
				</Card>

				<hr className="mt-6 mb-6" />

				<CardVolume />
			</WorkoutReviewContextProvider>
		</div>
	);
}
