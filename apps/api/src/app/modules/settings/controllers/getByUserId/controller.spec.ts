import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IGetByUserService } from "../../services/getByUser";
import { GetByUserIdController } from "./controller";

describe("Controller: GetByUserId", () => {
	let mockRequest: IRequest;
	let controller: GetByUserIdController;
	let mockedService: Mocked<IGetByUserService>;

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

		controller = new GetByUserIdController(mockedService);
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
});
