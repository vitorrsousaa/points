import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	DeleteService,
	type IDeleteInput,
	type IDeleteService,
} from "./service";

describe("Service:Delete", () => {
	let service: IDeleteService;
	let mockedWorkoutRepository: Mocked<IWorkoutRepository>;

	const inputData: IDeleteInput = {
		athleteId: "a4360855-03bf-4fd0-90c1-49c8ff2a351c",
		coachId: "abdffccc-d111-4b9f-a1ee-c98c8b2cc47b",
		workoutId: "a4360855-03bf-4fd0-90c1-49c8ff2a351c",
	};

	beforeEach(() => {
		mockedWorkoutRepository = {
			getById: vi.fn(),
			delete: vi.fn(),
		} as unknown as Mocked<IWorkoutRepository>;

		service = new DeleteService(mockedWorkoutRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('Should throw "Workout not found" when workout not found ', async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Workout not found",
		);
	});
	it('Should throw "You do not have permission..." when workout is owned by other coach', async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue({
			coachId: "other-coach-id",
		} as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"You do not have permission to assign workouts to this athlete.",
		);
	});
	it('Should throw "You do not have permission..." when workout is owned by other athlete', async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue({
			coachId: inputData.coachId,
			athleteId: "other-athlete-id",
		} as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"You do not have permission to assign workouts to this athlete.",
		);
	});
	it("Should call workout repository with correct workoutId", async () => {
		// Arrange
		mockedWorkoutRepository.getById.mockResolvedValue({
			coachId: inputData.coachId,
			athleteId: inputData.athleteId,
			createdAt: "2021-09-01T00:00:00Z",
		} as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedWorkoutRepository.delete).toBeCalledWith(
			inputData.workoutId,
			"2021-09-01T00:00:00Z",
		);
	});
});
