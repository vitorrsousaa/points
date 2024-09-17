import { ResetPasswordController } from "@application/modules/auth/controllers/reset-password";
import { makeResetPasswordService } from "@factories/services/auth/reset-password";

export function makeResetPasswordController() {
	return new ResetPasswordController(makeResetPasswordService());
}
