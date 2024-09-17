import { ForgotPasswordController } from "@application/modules/auth/controllers/forgot-password";
import { makeForgotPasswordService } from "@factories/services/auth/forgot-password";

export function makeForgotPasswordController() {
	return new ForgotPasswordController(makeForgotPasswordService());
}
