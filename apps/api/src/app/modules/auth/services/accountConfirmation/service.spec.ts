import type { IUserRepository } from "@application/database/repositories/user";
import type { IAuthProvider } from "@application/providers/auth";
import type { TRole } from "@core/domain/role";
import { type Mocked, vi } from "vitest";
import {
	AccountConfirmationService,
	type IAccountConfirmationInput,
	type IAccountConfirmationService,
} from "./service";

describe("Service:AccountConfirmation", () => {
	let service: IAccountConfirmationService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	let mockedUserRepository: Mocked<IUserRepository>;

	const inputData: IAccountConfirmationInput = {
		code: "123456",
		email: "email@email.com",
	};

	const defaultUser = {
		id: "123",
		email: "email",
		accountConfirmation: false,
		doctorId: null,
		name: "name",
		role: ["DOCTOR"] as TRole,
	};

	beforeEach(() => {
		mockedAuthProvider = {
			accountConfirmation: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		mockedUserRepository = {
			update: vi.fn(),
			getByEmail: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		mockedUserRepository.getByEmail.mockResolvedValue(defaultUser);

		service = new AccountConfirmationService(
			mockedAuthProvider,
			mockedUserRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should return null when account confirmation is called correctly", async () => {
		// Arrange

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toBeNull();
	});
	it("Should call account confirmation with correct parameters", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAuthProvider.accountConfirmation).toHaveBeenCalledWith(
			inputData.email,
			inputData.code,
		);
	});
	it("Should call `userRepository.getByEmail` with correct parameters", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedUserRepository.getByEmail).toHaveBeenCalledWith(
			inputData.email,
		);
	});
	it("Should throw an error when `userRepository.getByEmail` returns undefined", async () => {
		// Arrange

		// Act
		mockedUserRepository.getByEmail.mockResolvedValue(undefined);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow("User not found");
	});
	it("Should call `userRepository.update` with correct parameters", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedUserRepository.update).toHaveBeenCalledWith(defaultUser.id, {
			...defaultUser,
			accountConfirmation: true,
		});
	});
});
