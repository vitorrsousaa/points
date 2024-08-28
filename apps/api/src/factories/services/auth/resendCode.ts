import { ResendCodeService } from "@application/modules/auth/services/resendCode";
import { makeAuthProvider } from "@factories/providers/authProvider";

export function makeResendCodeService() {
	return new ResendCodeService(makeAuthProvider());
}
