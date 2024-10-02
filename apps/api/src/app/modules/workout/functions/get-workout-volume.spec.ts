import { defaultVolume, getWorkoutVolume } from "./get-workout-volume";

describe("GetWorkoutVolume", () => {
	it("Should return defaultVolume when exercises is empty", () => {
		const result = getWorkoutVolume([]);

		expect(result).toEqual(defaultVolume);
	});
});
