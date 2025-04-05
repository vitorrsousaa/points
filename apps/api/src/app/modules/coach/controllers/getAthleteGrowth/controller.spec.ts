import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetAthleteGrowthService } from "../../services/getAthleteGrowth";
import { GetAthleteGrowthController } from "./controller";

describe("Controller: GetAthleteGrowth", () => {
	let mockRequest: IRequest;
	let controller: GetAthleteGrowthController;
	let mockedService: Mocked<IGetAthleteGrowthService>;

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

		controller = new GetAthleteGrowthController(mockedService);
	});

	afterEach(() => {
		vi.clearAllMocks();
		mockRequest.body = {};
	});

	it("should throw error when missing fields", async () => {
		// Arrange
		mockRequest.body = {
			email: undefined,
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({ statusCode: 422 });
	});

	it("should return response with correct return of service when fields are ok", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue({
			growth: "0.00",
			activeGrowth: "0.00",
		});
		mockRequest.userId = "30ac0b91-faa4-4051-86e7-ff25526162f2";

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {
				growth: "0.00",
				activeGrowth: "0.00",
			},
		});
	});
});
