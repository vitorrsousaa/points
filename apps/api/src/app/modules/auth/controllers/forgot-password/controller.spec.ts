import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IForgotPasswordService } from "../../services/forgot-password";
import { ForgotPasswordController } from "./controller";

describe("Controller: ForgotPassword", () => {
	let mockRequest: IRequest;
	let controller: ForgotPasswordController;
	let mockedService: Mocked<IForgotPasswordService>;

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

		controller = new ForgotPasswordController(mockedService);
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
		mockedService.execute.mockResolvedValue(null);
		mockRequest.body = {
			email: "jonas@email.com",
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 204,
			body: {},
		});
	});
});
