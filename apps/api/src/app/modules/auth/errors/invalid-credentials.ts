import { AppError } from "@application/errors/app-error";

export class InvalidCredentials extends AppError {
	constructor() {
		super("Invalid Credentials", 401, "INVALID_CREDENTIALS");
	}
}
