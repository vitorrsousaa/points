import type { Workout, WorkoutVolume } from "@core/domain/workout";

export const defaultVolume = {
	B: { sets: 0, load: 0 },
	S: { sets: 0, load: 0 },
	D: { sets: 0, load: 0 },
};

export function getWorkoutVolume(exercises: Workout["exercises"]) {
	const volume: WorkoutVolume = exercises.reduce((acc, exercise) => {
		const { sets, target } = exercise;

		if (!target || !sets) return acc;

		const totalSets = sets.reduce(
			(acc, set) => {
				const { type, reps, weight } = set;

				if (type === "W" || !reps || !weight) return acc;

				const totalWeight = reps * weight;

				return {
					sets: type === "T" ? acc.sets + 1 : acc.sets,
					load: acc.load + totalWeight,
				};
			},
			{ sets: 0, load: 0 },
		);

		return {
			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			...acc,
			[target]: totalSets,
		};
	}, defaultVolume);

	return volume;
}
