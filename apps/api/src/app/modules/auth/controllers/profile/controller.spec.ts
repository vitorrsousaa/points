import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IProfileService } from "../../services/profile";
import { ProfileController } from "./controller";

describe("Controller: Profile", () => {
	let mockRequest: IRequest;
	let controller: ProfileController;
	let mockedService: Mocked<IProfileService>;

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

		controller = new ProfileController(mockedService);
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
		mockedService.execute.mockResolvedValue({
			id: "123",
			name: "John",
			email: "email@email.com",
			role: ["ADMIN"],
		});
		mockRequest.userId = "c65c40a3-4455-4bc3-9bda-451abc54250b";

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {
				id: "123",
				name: "John",
			},
		});
	});
});
