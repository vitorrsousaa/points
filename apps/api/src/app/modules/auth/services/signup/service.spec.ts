import type { IUserRepository } from "@application/database/repositories/user";
import type { IAuthProvider } from "@application/providers/auth";
import { type Mocked, vi } from "vitest";
import { signupData } from "../../mocks/signup";
import { type ISignupService, SignupService } from "./service";

describe("Service: Signup", () => {
	let service: ISignupService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	let mockedUserRepository: Mocked<IUserRepository>;

	beforeEach(() => {
		mockedAuthProvider = {
			signup: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		mockedUserRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		service = new SignupService(mockedAuthProvider, mockedUserRepository);
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
	it("should throw an error when user is PATIENT but not there is a doctorId", async () => {
		// Arrange

		// Act
		const role = ["PATIENT"] as typeof signupData.role;

		// Assert
		await expect(service.execute({ ...signupData, role })).rejects.toThrow(
			"doctorId is required for PATIENT role",
		);
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
			doctorId: null,
			email: signupData.email,
			name: `${signupData.firstName} ${signupData.lastName}`,
			role: signupData.role,
		});
	});
	it('should call "create" method from userRepository with doctorId if the user is PATIENT and doctorId is defined', async () => {
		// Arrange
		mockedAuthProvider.signup.mockResolvedValue({ userId: "userId" });

		// Act
		await service.execute({
			...signupData,
			role: ["PATIENT"],
			doctorId: "doctorId",
		});

		// Assert
		expect(mockedUserRepository.create).toHaveBeenCalledWith({
			id: "userId",
			accountConfirmation: false,
			doctorId: "doctorId",
			email: signupData.email,
			name: `${signupData.firstName} ${signupData.lastName}`,
			role: ["PATIENT"],
		});
	});
	it('should call "create" method from userRepository without doctorId if the user is not PATIENT and doctorId is defined', async () => {
		// Arrange
		mockedAuthProvider.signup.mockResolvedValue({ userId: "userId" });

		// Act
		await service.execute({
			...signupData,
			role: ["ADMIN"],
			doctorId: "doctorId",
		});

		// Assert
		expect(mockedUserRepository.create).toHaveBeenCalledWith({
			id: "userId",
			accountConfirmation: false,
			doctorId: null,
			email: signupData.email,
			name: `${signupData.firstName} ${signupData.lastName}`,
			role: ["ADMIN"],
		});
	});
});
