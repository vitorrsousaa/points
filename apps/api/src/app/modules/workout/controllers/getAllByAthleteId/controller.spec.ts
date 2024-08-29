import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import { GetAllByAthleteIdController } from "./controller";
import type { IGetAllByAthleteIdService } from "../../services/getAllByAthleteId";

describe("Controller: GetAllByAthleteId", () => {
	let mockRequest: IRequest;
	let controller: GetAllByAthleteIdController;
	let mockedService: Mocked<IGetAllByAthleteIdService>;
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
		controller = new GetAllByAthleteIdController(mockedService);
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
		mockRequest.params = { athleteId: "123" };
		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: [],
		});
	});
	it("should call service with correct athleteId and status undefined when query params is not defined", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue([]);
		mockRequest.params = { athleteId: "123" };
		// Act
		await controller.handle(mockRequest);

		// Assert
		expect(mockedService.execute).toHaveBeenCalledWith({
			athleteId: "123",
			status: undefined,
		});
	});
	it("should call service with correct athleteId and status active when query params is defined", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue([]);
		mockRequest.params = { athleteId: "123" };
		mockRequest.queryParams = { status: "active" };

		// Act
		await controller.handle(mockRequest);

		// Assert
		expect(mockedService.execute).toHaveBeenCalledWith({
			athleteId: "123",
			status: "active",
		});
	});
});
