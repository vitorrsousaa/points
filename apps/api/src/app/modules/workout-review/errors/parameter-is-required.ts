import { AppError } from "@application/errors/app-error";

export class ParameterIsRequired extends AppError {
	constructor() {
		super("You must provide a coachId or athleteId", 400);
	}
}
