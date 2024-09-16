import { type Mocked, vi } from "vitest";
import {
	type IRefreshTokenInput,
	type IRefreshTokenService,
	RefreshTokenService,
} from "./service";
import type { IAuthProvider } from "@application/providers/auth";

describe("Service:RefreshToken", () => {
	let service: IRefreshTokenService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	const inputData: IRefreshTokenInput = {
		refreshToken: "John Doe",
	};

	beforeEach(() => {
		mockedAuthProvider = {
			refreshToken: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		service = new RefreshTokenService(mockedAuthProvider);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call refresh token method with correct input", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAuthProvider.refreshToken).toHaveBeenCalledWith(
			inputData.refreshToken,
		);
	});
});
