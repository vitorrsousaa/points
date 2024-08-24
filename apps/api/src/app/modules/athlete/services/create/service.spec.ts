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

	const now = new Date().toISOString();

	const defaultUser: UnwrapPromise<ReturnType<IUserRepository["getById"]>> = {
		accountConfirmation: true,
		email: "email",
		id: "123",
		name: "name",
		role: ["ADMIN"],
		createdAt: now,
		updatedAt: now,
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
			create: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;
		mockedSignupService = {
			execute: vi.fn(),
		} as unknown as Mocked<ISignupService>;

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
		mockedAthleteRepository.create.mockResolvedValue({
			...inputData,
			role: ["ATHLETE"],
			accountConfirmation: false,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["create"]>>);

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
	it("Should call athleteRepository with athleteId when service is called with athleteId", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			...defaultUser,
			role: ["COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);
		mockedSignupService.execute.mockResolvedValue({ userId: "123" });
		mockedAthleteRepository.create.mockResolvedValue({
			...inputData,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["create"]>>);

		// Act
		await service.execute({ ...inputData, athleteId: "athleteId" });

		// Assert
		expect(mockedAthleteRepository.create).toBeCalledWith(
			expect.objectContaining({
				name: `${inputData.firstName} ${inputData.lastName}`,
				id: "athleteId",
				age: inputData.age,
				coachId: inputData.coachId,
				height: inputData.height,
				weight: inputData.weight,
			}),
		);
	});
	it("Should call athleteRepository with userId returned of signupService when athleteId is not defined", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			...defaultUser,
			role: ["COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);
		mockedSignupService.execute.mockResolvedValue({ userId: "123" });
		mockedAthleteRepository.create.mockResolvedValue({
			...inputData,
			id: "123",
			name: `${inputData.firstName} ${inputData.lastName}`,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["create"]>>);

		// Act
		await service.execute({ ...inputData, athleteId: undefined });

		// Assert
		expect(mockedAthleteRepository.create).toBeCalledWith(
			expect.objectContaining({
				name: `${inputData.firstName} ${inputData.lastName}`,
				id: "123",
				age: inputData.age,
				coachId: inputData.coachId,
				height: inputData.height,
				weight: inputData.weight,
			}),
		);
	});
});
