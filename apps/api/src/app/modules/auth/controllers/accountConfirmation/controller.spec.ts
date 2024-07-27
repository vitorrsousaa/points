import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IAccountConfirmationService } from "../../services/accountConfirmation";
import { AccountConfirmationController } from "./controller";

describe("Controller: AccountConfirmation", () => {
	let mockRequest: IRequest;
	let controller: AccountConfirmationController;
	let mockedService: Mocked<IAccountConfirmationService>;

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

		controller = new AccountConfirmationController(mockedService);
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
		mockRequest.body = {
			code: "123456",
			email: "email@email.com",
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 204,
			body: null,
		});
	});
});
