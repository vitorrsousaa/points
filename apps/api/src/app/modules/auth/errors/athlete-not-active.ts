import { AppError } from "@application/errors/app-error";

export class AthleteNotActive extends AppError {
	constructor() {
		super("Athlete not active", 409);
	}
}
