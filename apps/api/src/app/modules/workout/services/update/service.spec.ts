import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	type IUpdateInput,
	type IUpdateService,
	UpdateService,
} from "./service";

describe("Service:Update", () => {
	let service: IUpdateService;
	let mockedWorkoutRepository: Mocked<IWorkoutRepository>;
	const inputData = {
		name: "John Doe",
		coachId: "456",
	} as unknown as IUpdateInput;

	beforeEach(() => {
		mockedWorkoutRepository = {
			update: vi.fn(),
			getById: vi.fn(),
		} as unknown as Mocked<IWorkoutRepository>;

		service = new UpdateService(mockedWorkoutRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('Should throw error "Workout not found" when workoutRepository returns "null" for "getById"', async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Workout not found",
		);
	});

	it('Should throw error "Workout is owned by other coach" when workoutRepository returns "workout" for other coach', async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue({
			coachId: "123",
		} as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Workout is owned by other coach",
		);
	});
});
