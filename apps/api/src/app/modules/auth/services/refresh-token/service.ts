import type { IService } from "@application/interfaces/service";
import type { IAuthProvider } from "@application/providers/auth";
import * as z from "zod";

export const RefreshTokenInputServiceSchema = z.object({
	refreshToken: z.string(),
});

export type TRefreshToken = z.infer<typeof RefreshTokenInputServiceSchema>;

export type IRefreshTokenInput = TRefreshToken;

export type IRefreshTokenOutput = ReturnType<IAuthProvider["refreshToken"]>;

export type IRefreshTokenService = IService<
	IRefreshTokenInput,
	IRefreshTokenOutput
>;

export class RefreshTokenService implements IRefreshTokenService {
	constructor(private readonly authProvider: IAuthProvider) {}

	async execute(
		refreshTokenInput: IRefreshTokenInput,
	): Promise<IRefreshTokenOutput> {
		return this.authProvider.refreshToken(refreshTokenInput.refreshToken);
	}
}
