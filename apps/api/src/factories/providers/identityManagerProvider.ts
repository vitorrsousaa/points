import { IdentityManagerProvider } from "@application/providers/identityManager";
import { makeConfigEnvironment } from "@factories/config/environment";
import { makeCognitoClient } from "@factories/libs/cognitoClient";

export function makeIdentityManagerProvider() {
	return new IdentityManagerProvider(
		makeCognitoClient(),
		makeConfigEnvironment(),
	);
}
