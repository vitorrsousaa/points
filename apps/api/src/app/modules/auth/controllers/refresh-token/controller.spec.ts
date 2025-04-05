import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IRefreshTokenService } from "../../services/refresh-token";
import { RefreshTokenController } from "./controller";

describe("Controller: RefreshToken", () => {
	let mockRequest: IRequest;
	let controller: RefreshTokenController;
	let mockedService: Mocked<IRefreshTokenService>;

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

		controller = new RefreshTokenController(mockedService);
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
		mockedService.execute.mockResolvedValue({ accessToken: "accessToken" });
		mockRequest.body = {
			refreshToken: "refresh",
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {},
		});
	});
});
