import { AppError } from "@application/errors/app-error";

export class AthleteNotAssigned extends AppError {
	constructor() {
		super("Athlete is not assigned to this coach", 400);
	}
}
