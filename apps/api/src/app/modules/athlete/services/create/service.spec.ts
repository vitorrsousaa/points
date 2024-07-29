import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { ISignupService } from "@application/modules/auth/services/signup";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	CreateService,
	type ICreateInput,
	type ICreateService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedSignupService: Mocked<ISignupService>;
	let mockedUserRepository: Mocked<IUserRepository>;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;

	const defaultUser: UnwrapPromise<ReturnType<IUserRepository["getById"]>> = {
		accountConfirmation: true,
		email: "email",
		id: "123",
		name: "name",
		role: ["ADMIN"],
	};

	const inputData: ICreateInput = {
		age: 25,
		weight: 80,
		coachId: "123",
		email: "john@email.com",
		firstName: "John",
		lastName: "Doe",
		height: 180,
	};

	beforeEach(() => {
		mockedUserRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IUserRepository>;
		mockedAthleteRepository = {
			update: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;
		mockedSignupService = {
			execute: vi.fn(),
		} as unknown as Mocked<ISignupService>;
		mockedAthleteRepository = {
			update: vi.fn(),
		};
		service = new CreateService(
			mockedSignupService,
			mockedUserRepository,
			mockedAthleteRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when userRepository does not found user by coachId", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue(undefined);

		// Act

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow("Coach not found");
	});
	it("Should throw error when userRepository returned a user with incorrect role", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue(defaultUser);

		// Act

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Coach is required",
		);
	});
	it("Should return of service the returned of athlete repository", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			...defaultUser,
			role: ["COACH"],
		});
		mockedSignupService.execute.mockResolvedValue({ userId: "123" });
		mockedAthleteRepository.update.mockResolvedValue({
			...inputData,
			role: ["ATHLETE"],
			accountConfirmation: false,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		});

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toStrictEqual({
			...inputData,
			role: ["ATHLETE"],
			accountConfirmation: false,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		});
	});
	it("Should call athleteRepository with ATHLETE role", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			...defaultUser,
			role: ["COACH"],
		});
		mockedSignupService.execute.mockResolvedValue({ userId: "123" });
		mockedAthleteRepository.update.mockResolvedValue({
			...inputData,
			role: ["ATHLETE"],
			accountConfirmation: false,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		});

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(mockedAthleteRepository.update).toBeCalledWith({
			name: `${inputData.firstName} ${inputData.lastName}`,
			role: ["ATHLETE"],
			id: "123",
			accountConfirmation: false,
			age: inputData.age,
			coachId: inputData.coachId,
			email: inputData.email,
			height: inputData.height,
			weight: inputData.weight,
		});
	});
});
