import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { IDeleteService } from "../../services/delete";
import { DeleteController } from "./controller";

describe("Controller: Delete", () => {
	let mockRequest: IRequest;
	let controller: DeleteController;
	let mockedService: Mocked<IDeleteService>;

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

		controller = new DeleteController(mockedService);
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
		mockRequest.userId = "abdffccc-d111-4b9f-a1ee-c98c8b2cc47b";
		mockRequest.queryParams = {
			athleteId: "a4360855-03bf-4fd0-90c1-49c8ff2a351c",
			workoutId: "a4360855-03bf-4fd0-90c1-49c8ff2a351c",
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
