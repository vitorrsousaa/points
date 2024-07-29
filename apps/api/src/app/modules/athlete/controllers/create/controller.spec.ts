import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import type { ICreateInput, ICreateService } from "../../services/create";
import { CreateController } from "./controller";

describe("Controller: Create", () => {
	let mockRequest: IRequest;
	let controller: CreateController;
	let mockedService: Mocked<ICreateService>;

	const inputData: ICreateInput = {
		age: 25,
		weight: 80,
		coachId: "37616c40-8ae9-4f84-a55e-4b1fbd4bce44",
		email: "john@email.com",
		firstName: "John",
		lastName: "Doe",
		height: 180,
	};

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

		controller = new CreateController(mockedService);
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
		mockedService.execute.mockResolvedValue({ name: "John Doe" });
		mockRequest.body = { ...inputData };

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toStrictEqual({
			statusCode: 200,
			body: {
				name: "John Doe",
			},
		});
	});
});
