import { AppError } from "@application/errors/app-error";

export class DoctorIsRequired extends AppError {
	constructor() {
		super("doctorId is required for PATIENT role", 422);
	}
}
