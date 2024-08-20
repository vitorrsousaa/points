import type { IUserRepository } from "@application/database/repositories/user";
import type { ICreateSettingsService } from "@application/modules/settings/services/create";
import type { IAuthProvider } from "@application/providers/auth";
import { type Mocked, vi } from "vitest";
import { signupData } from "../../mocks/signup";
import { type ISignupService, SignupService } from "./service";

describe("Service: Signup", () => {
	let service: ISignupService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	let mockedUserRepository: Mocked<IUserRepository>;
	let mockedCreateSettingsService: Mocked<ICreateSettingsService>;

	beforeEach(() => {
		mockedAuthProvider = {
			signup: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		mockedUserRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		mockedCreateSettingsService = {
			execute: vi.fn(),
		} as unknown as Mocked<ICreateSettingsService>;

		service = new SignupService(
			mockedAuthProvider,
			mockedUserRepository,
			mockedCreateSettingsService,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should return `userId` when signup is called correctly", async () => {
		// Arrange
		mockedAuthProvider.signup.mockResolvedValue({ userId: "userId" });

		// Act
		const result = await service.execute(signupData);

		// Assert
		expect(result).toEqual({ userId: "userId" });
	});
	it("should throw an error when signup fails", async () => {
		// Arrange
		const error = new Error("Signup failed");

		// Act
		mockedAuthProvider.signup.mockRejectedValueOnce(error);

		// Assert
		await expect(service.execute(signupData)).rejects.toThrow("Signup failed");
	});

	it('should call "create" method from userRepository', async () => {
		// Arrange
		mockedAuthProvider.signup.mockResolvedValue({ userId: "userId" });

		// Act
		await service.execute(signupData);

		// Assert
		expect(mockedUserRepository.create).toHaveBeenCalledWith({
			id: "userId",
			accountConfirmation: false,
			email: signupData.email,
			name: `${signupData.firstName} ${signupData.lastName}`,
			role: signupData.role,
		});
	});
});
