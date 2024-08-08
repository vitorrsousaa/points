import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetAllService } from "../../services/getAll";
import { GetAllController } from "./controller";

describe("Controller: GetAll", () => {
	let mockRequest: IRequest;
	let controller: GetAllController;
	let mockedService: Mocked<IGetAllService>;

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

		controller = new GetAllController(mockedService);
	});

	afterEach(() => {
		vi.clearAllMocks();
		mockRequest.body = {};
	});

	// it("should throw error when missing fields", async () => {
	// 	// Arrange
	// 	mockRequest.body = {
	// 		email: undefined,
	// 	};

	// 	// Act
	// 	const result = await controller.handle(mockRequest);

	// 	// Assert
	// 	expect(result).toMatchObject({ statusCode: 422 });
	// });

	it("should return response with correct return of service when fields are ok", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue([]);
		mockRequest.body = {};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {},
		});
	});
});
