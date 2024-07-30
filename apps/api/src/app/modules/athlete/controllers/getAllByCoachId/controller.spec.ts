import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetAllByCoachIdService } from "../../services/getAllByCoachId";
import { GetAllByCoachIdController } from "./controller";

describe("Controller: GetAllByCoachId", () => {
	let mockRequest: IRequest;
	let controller: GetAllByCoachIdController;
	let mockedService: Mocked<IGetAllByCoachIdService>;

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

		controller = new GetAllByCoachIdController(mockedService);
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

	it("should call service with correct coachId ", async () => {
		// Arrange
		// mockedService.execute.mockResolvedValue({});
		mockRequest.params = { coachId: "b65e60d1-4447-426b-809b-f101883bb5bc" };

		// Act
		await controller.handle(mockRequest);

		// Assert
		expect(mockedService.execute).toHaveBeenCalledWith({
			coachId: "b65e60d1-4447-426b-809b-f101883bb5bc",
		});
	});
});
