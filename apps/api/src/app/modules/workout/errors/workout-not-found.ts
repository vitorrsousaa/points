import { AppError } from "@application/errors/app-error";

export class WorkoutNotFound extends AppError {
	constructor() {
		super("Workout not found", 404);
	}
}
