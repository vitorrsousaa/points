import { RefreshTokenService } from "@application/modules/auth/services/refresh-token";
import { makeAuthProvider } from "@factories/providers/authProvider";

export function makeRefreshTokenService() {
	return new RefreshTokenService(makeAuthProvider());
}
