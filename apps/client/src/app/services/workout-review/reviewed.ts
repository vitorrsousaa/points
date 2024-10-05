import type { WorkoutReview } from "@/entitites/workout-review";
import { httpClient } from "../httpClient";

export async function reviewed({
	workoutReview,
}: { workoutReview: WorkoutReview }) {
	const { data } = await httpClient.put("/workout-review", {
		...workoutReview,
	});

	return data;
}
