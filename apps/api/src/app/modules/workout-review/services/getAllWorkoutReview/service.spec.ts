import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import { type Mocked, vi } from "vitest";
import {
	GetAllWorkoutReviewService,
	type IGetAllWorkoutReviewInput,
	type IGetAllWorkoutReviewService,
} from "./service";

describe("Service:GetAllWorkoutReview", () => {
	let service: IGetAllWorkoutReviewService;
	let mockedWorkoutReviewRepository: Mocked<IWorkoutReviewRepository>;
	const inputData: IGetAllWorkoutReviewInput = {
		limit: 10,
	};

	beforeEach(() => {
		mockedWorkoutReviewRepository = {
			getAllWorkoutReviewByAthleteId: vi.fn(),
			getAllWorkoutReviewByCoachId: vi.fn(),
		} as unknown as Mocked<IWorkoutReviewRepository>;
		service = new GetAllWorkoutReviewService(mockedWorkoutReviewRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when coachId and athleteId is not used", async () => {
		// Arrange

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"You must provide a coachId or athleteId",
		);
	});
	it("Should call 'getAllWorkoutReviewByCoachId' with coachId and reviewed parameters", async () => {
		// Arrange

		// Act
		await service.execute({ ...inputData, coachId: "123", reviewed: true });

		// Assert
		expect(
			mockedWorkoutReviewRepository.getAllWorkoutReviewByCoachId,
		).toHaveBeenCalledWith("123", true);
	});
	it("Should call 'getAllWorkoutReviewByAthleteId' with athleteId and reviewed parameters", async () => {
		// Arrange

		// Act
		await service.execute({ ...inputData, athleteId: "123", reviewed: true });

		// Assert
		expect(
			mockedWorkoutReviewRepository.getAllWorkoutReviewByAthleteId,
		).toHaveBeenCalledWith("123", inputData.limit, true);
	});
});
