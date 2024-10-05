import { EmailProvider } from "@application/providers/email/provider";
import { makeResendClient } from "@factories/libs/resend";

export function makeEmailProvider() {
	return new EmailProvider(makeResendClient());
}
