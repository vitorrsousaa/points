// import type { WorkoutReview } from "@/entitites/workout-review";
// import { httpClient } from "../httpClient";

import type { WorkoutReview } from "@/entitites/workout-review";

export async function reviewed({
	workoutReview,
}: { workoutReview: WorkoutReview }) {
	throw new Error("Not implemented");
	// const { data } = await httpClient.put("/workout-review", {
	// 	...workoutReview,
	// });

	// return data;
}
