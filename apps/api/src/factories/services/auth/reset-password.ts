import { ResetPasswordService } from "@application/modules/auth/services/reset-password";
import { makeAuthProvider } from "@factories/providers/authProvider";

export function makeResetPasswordService() {
	return new ResetPasswordService(makeAuthProvider());
}
