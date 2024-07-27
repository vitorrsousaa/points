import { AuthProvider } from "@application/providers/auth";
import { makeIdentityManagerProvider } from "./identityManagerProvider";

export function makeAuthProvider() {
	return new AuthProvider(makeIdentityManagerProvider());
}
