import { AppError } from "@application/errors/app-error";

export class AccountAlreadyConfirmed extends AppError {
	constructor() {
		super("Account already confirmed", 409);
	}
}
