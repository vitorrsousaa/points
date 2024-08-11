import { AppError } from "@application/errors/app-error";

export class CoachNotAuthorized extends AppError {
	constructor() {
		super(
			"You do not have permission to assign workouts to this athlete.",
			403,
		);
	}
}
