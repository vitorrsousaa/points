import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetAllWorkoutReviewService } from "../../services/getAllWorkoutReview";
import { GetAllWorkoutReviewController } from "./controller";

describe("Controller: GetAllWorkoutReview", () => {
	let mockRequest: IRequest;
	let controller: GetAllWorkoutReviewController;
	let mockedService: Mocked<IGetAllWorkoutReviewService>;

	beforeEach(() => {
		mockRequest = {
			body: {},
			headers: {},
			params: {},
			queryParams: {},
			userId: null,
		};

		mockedService = {
			execute: vi.fn(),
		};

		controller = new GetAllWorkoutReviewController(mockedService);
	});

	afterEach(() => {
		vi.clearAllMocks();
		mockRequest.body = {};
	});

	it("should throw error when missing fields", async () => {
		// Arrange

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({ statusCode: 422 });
	});

	it("should return response with correct return of service when fields are ok", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue([]);
		mockRequest.queryParams = {
			coachId: "b8fd9e98-6e67-4a41-8f2a-e2175cfa78f0",
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: [],
		});
	});
});
