import { AppError } from "@application/errors/app-error";

export class WorkoutNotAssignedToCoach extends AppError {
	constructor() {
		super("Workout is not assigned to this coach", 400);
	}
}
