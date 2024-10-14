import { SendEmailAdminService } from "@application/modules/admin/services/send-email-admin";
import { makeEmailProvider } from "@factories/providers/email-provider";
import { makeUserRepository } from "@factories/repositories/user";

export function makeSendEmailAdminService() {
	return new SendEmailAdminService(makeUserRepository(), makeEmailProvider());
}
