import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { ISigninService } from "../../services/signin";
import { SigninController } from "./controller";

describe("Controller: Signin", () => {
	let mockRequest: IRequest;
	let controller: SigninController;
	let mockedService: Mocked<ISigninService>;

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

		controller = new SigninController(mockedService);
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
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});
		mockRequest.body = {
			email: "email@email.com",
			password: "123456789",
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: { accessToken: "accessToken", refreshToken: "refreshToken" },
		});
	});
});
