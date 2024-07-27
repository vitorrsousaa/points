import type { CreateUserDTO } from "@application/shared/entity/user";
import type { Mocked } from "vitest";
import type { IIdentityManagerProvider } from "../identityManager";
import { AuthProvider } from "./provider";
import type { IAuthProvider } from "./types";

describe("Auth provider", () => {
	let authProvider: IAuthProvider;
	let identityManagerProviderMock: Mocked<IIdentityManagerProvider>;

	const userDTO: CreateUserDTO = {
		email: "john@email.com",
		firstName: "John",
		lastName: "Doe",
		password: "password123",
		role: ["ADMIN"],
	};

	beforeEach(() => {
		identityManagerProviderMock = {
			signup: vi.fn() as unknown as Mocked<IIdentityManagerProvider>["signup"],
			profile:
				vi.fn() as unknown as Mocked<IIdentityManagerProvider>["profile"],
			accountConfirmation:
				vi.fn() as unknown as Mocked<IIdentityManagerProvider>["accountConfirmation"],
			signin: vi.fn() as unknown as Mocked<IIdentityManagerProvider>["signin"],
		} as Mocked<IIdentityManagerProvider>;

		authProvider = new AuthProvider(identityManagerProviderMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("signup", () => {
		it("should call identifyManagerProvider with correct user", async () => {
			// Arrange
			const userId = "mockAccessToken";
			identityManagerProviderMock.signup.mockResolvedValue({ userId });

			// Act
			const result = await authProvider.signup(userDTO);

			// Assert
			// expect(createUserServiceMock.execute).toHaveBeenCalledWith(payload);
			expect(identityManagerProviderMock.signup).toHaveBeenCalledWith(userDTO);
			// expect(result).toEqual({ accessToken });
		});
		it("should return accessToken when signup is successful", async () => {
			// Arrange
			const userId = "mockAccessToken";
			identityManagerProviderMock.signup.mockResolvedValue({ userId });

			// Act
			const result = await authProvider.signup(userDTO);

			// Assert
			expect(result).toEqual({ userId });
		});
	});

	describe("profile", () => {
		it("should call identityManagerProvider with correct userId", async () => {
			// Arrange
			const userId = "mockUserId";
			identityManagerProviderMock.profile.mockResolvedValue({
				...userDTO,
				id: "mockUserId",
			});

			// Act
			const result = await authProvider.profile(userId);

			// Assert
			expect(identityManagerProviderMock.profile).toHaveBeenCalledWith(userId);
		});
	});

	describe("accountConfirmation", () => {
		it("should call identityManagerProvider with correct email and code", async () => {
			// Arrange
			const email = "email@email.com";
			const code = "123456";
			identityManagerProviderMock.accountConfirmation.mockResolvedValue();

			// Act
			await authProvider.accountConfirmation(email, code);

			// Assert
			expect(
				identityManagerProviderMock.accountConfirmation,
			).toHaveBeenCalledWith(email, code);
		});
	});

	describe("signin", () => {
		it("should call identityManagerProvider with correct email and password", async () => {
			// Arrange
			const email = "email@email.com";
			const password = "password123";
			identityManagerProviderMock.signin.mockResolvedValue({
				accessToken: "mockAccessToken",
				refreshToken: "mockRefreshToken",
			});

			// Act
			const result = await authProvider.signin(email, password);

			// Assert
			expect(identityManagerProviderMock.signin).toHaveBeenCalledWith(
				email,
				password,
			);
		});
	});
});
