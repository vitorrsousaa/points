import { AppError } from "@application/errors/app-error";

export class WorkoutIsNotOwned extends AppError {
	constructor() {
		super("Workout is owned by other coach", 403);
	}
}
