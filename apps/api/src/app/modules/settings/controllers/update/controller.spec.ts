import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import { defaultSettings } from "../../constants/default-settings";
import type { IUpdateService } from "../../services/update";
import { UpdateController } from "./controller";

describe("Controller: Update", () => {
	let mockRequest: IRequest;
	let controller: UpdateController;
	let mockedService: Mocked<IUpdateService>;

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

		controller = new UpdateController(mockedService);
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
		mockRequest.userId = "96b820f4-e4a9-4c83-98b9-45f54b9f7e9a";
		mockRequest.body = {
			...defaultSettings,
			userId: "96b820f4-e4a9-4c83-98b9-45f54b9f7e9a",
			id: "96b820f4-e4a9-4c83-98b9-45f54b9f7e9a",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 201,
			body: null,
		});
	});
});
