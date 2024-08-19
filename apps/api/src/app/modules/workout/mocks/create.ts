import type { ICreateInput } from "../services/create";

export const createWorkoutInput: ICreateInput["workout"] = {
	name: "Workout 1",
	description: "Description",
	isActive: false,
	exercises: [
		{
			equipment: "Barra",
			primaryMuscle: "muscle",
			secondaryMuscle: "muscle",
			name: "Exercise 1",
			restTime: "Off",
			exerciseId: "f734ceaf-aed9-4a34-a8b2-ee12b9f7da25",
			notes: "Notes",
			target: null,
			sets: [{ type: "W", reps: 10, weight: 10 }],
		},
	],
};

export const createInput: ICreateInput = {
	coachId: "f734ceaf-aed9-4a34-a8b2-ee12b9f7da25",
	athleteId: "3f3ca31e-d6e9-4dbb-bfa9-d63a74549fb6",
	workout: createWorkoutInput,
};
