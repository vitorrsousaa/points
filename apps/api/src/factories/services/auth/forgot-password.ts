import { ForgotPasswordService } from "@application/modules/auth/services/forgot-password";
import { makeAuthProvider } from "@factories/providers/authProvider";

export function makeForgotPasswordService() {
	return new ForgotPasswordService(makeAuthProvider());
}
