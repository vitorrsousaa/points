import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import { createInput } from "../../mocks/create";
import {
	CreateService,
	type ICreateInput,
	type ICreateService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedUserRepository: Mocked<IUserRepository>;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	let mockedWorkoutRepository: Mocked<IWorkoutRepository>;

	beforeEach(() => {
		mockedUserRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IUserRepository>;
		mockedAthleteRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;
		mockedWorkoutRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IWorkoutRepository>;

		service = new CreateService(
			mockedUserRepository,
			mockedAthleteRepository,
			mockedWorkoutRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('Should throw error "Coach not found" when userRepository returns "undefined" for "getById"', async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue(undefined);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(createInput)).rejects.toThrow(
			"Coach not found",
		);
	});
	it('Should throw error "User should be coach" when userRepository returns user that not is coach', async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			accountConfirmation: true,
			email: "email@mail.com",
			id: "123",
			name: "name",
			role: ["ADMIN"],
		});

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(createInput)).rejects.toThrow(
			"User should be coach",
		);
	});
	it('Should throw error "Athlete not found" when athleteRepository returns "null" for "getById"', async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			accountConfirmation: true,
			email: "email@mail.com",
			id: "123",
			name: "name",
			role: ["COACH"],
		});
		mockedAthleteRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(createInput)).rejects.toThrow(
			"Athlete not found",
		);
	});
	it('Should throw error "You do not have permission" when athleteRepository returns the correct athlete but the coach is different', async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			role: ["COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);
		mockedAthleteRepository.getById.mockResolvedValue({
			coachId: "123",
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(createInput)).rejects.toThrow(
			"You do not have permission to assign workouts to this athlete",
		);
	});
	it("Should return the workout create by the repository when the parameters is ok", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			role: ["COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);
		mockedAthleteRepository.getById.mockResolvedValue({
			coachId: createInput.coachId,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);
		mockedWorkoutRepository.create.mockResolvedValue({
			name: "Workout 1",
		} as unknown as UnwrapPromise<ReturnType<IWorkoutRepository["create"]>>);

		// Act
		const result = await service.execute(createInput);

		// Assert
		expect(result).toMatchObject({ name: "Workout 1" });
	});
});
