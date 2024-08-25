import { type Mocked, vi } from "vitest";
import {
	type ICreateInput,
	type ICreateService,
	CreateService,
} from "./service";
import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { UnwrapPromise } from "@application/utils/types";
import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import { workoutExerciseInput } from "@application/modules/workout/mocks/create";
import { defaultVolume } from "@application/modules/workout/functions/get-workout-volume";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	let mockedWorkoutReviewRepository: Mocked<IWorkoutReviewRepository>;
	const inputData: ICreateInput = {
		athleteId: "123",
		coachId: "456",
		notes: "Some notes",
		workoutId: "789",
		plannedExercises: [workoutExerciseInput],
		realizedExercises: [workoutExerciseInput],
		plannedVolume: defaultVolume,
	};

	beforeEach(() => {
		mockedAthleteRepository = {
			getById: vi.fn(),
			update: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;
		mockedWorkoutReviewRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IWorkoutReviewRepository>;

		service = new CreateService(
			mockedAthleteRepository,
			mockedWorkoutReviewRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when athlete not found", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Athlete not found",
		);
	});
	it("Should update athleteRepository with one unit more on workout count", async () => {
		// Arrange
		const DEFAULT_WORKOUT_COUNT = 98;
		mockedAthleteRepository.getById.mockResolvedValue({
			workoutCount: DEFAULT_WORKOUT_COUNT,
			name: "John Doe",
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAthleteRepository.update).toHaveBeenCalledWith({
			workoutCount: DEFAULT_WORKOUT_COUNT + 1,
			name: "John Doe",
		});
	});
});
