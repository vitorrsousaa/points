import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetAllAthletesService } from "../../services/getAllAthletes";
import { GrowthAthletesController } from "./controller";

describe("Controller: GrowthAthletes", () => {
	let mockRequest: IRequest;
	let controller: GrowthAthletesController;
	let mockedService: Mocked<IGetAllAthletesService>;

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

		controller = new GrowthAthletesController(mockedService);
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
		mockedService.execute.mockResolvedValue({ length: 4, growth: "12" });
		mockRequest.userId = "7c26b6f2-d454-40ba-ba2a-a6f822c1a737";

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {},
		});
	});
});
