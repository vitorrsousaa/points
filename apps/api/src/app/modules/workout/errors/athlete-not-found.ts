import { AppError } from "@application/errors/app-error";

export class AthleteNotFound extends AppError {
	constructor() {
		super("Athlete not found", 404);
	}
}
