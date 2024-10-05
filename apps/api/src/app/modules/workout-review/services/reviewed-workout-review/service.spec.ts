import { type Mocked, vi } from "vitest";
import {
	type IReviewedWorkoutReviewInput,
	type IReviewedWorkoutReviewService,
	ReviewedWorkoutReviewService,
} from "./service";

describe("Service:ReviewedWorkoutReview", () => {
	let service: IReviewedWorkoutReviewService;
	const inputData: IReviewedWorkoutReviewInput = {
		name: "John Doe",
	};

	beforeEach(() => {
		service = new ReviewedWorkoutReviewService();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(true).toBe(true);
	});
});
