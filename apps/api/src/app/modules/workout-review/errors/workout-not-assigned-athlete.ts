import { AppError } from "@application/errors/app-error";

export class WorkoutNotAssignedToAthlete extends AppError {
	constructor() {
		super("Workout is not assigned to this athlete", 400);
	}
}
