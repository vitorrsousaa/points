import { AppError } from "@application/errors/app-error";

export class SettingsAlreadyExists extends AppError {
	constructor() {
		super("Settings Already Exists", 409);
	}
}
