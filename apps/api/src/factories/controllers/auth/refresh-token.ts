import { RefreshTokenController } from "@application/modules/auth/controllers/refresh-token";
import { makeRefreshTokenService } from "@factories/services/auth/refresh-token";

export function makeRefreshTokenController() {
	return new RefreshTokenController(makeRefreshTokenService());
}
