import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";
import { signupData } from "../../mocks/signup";
import type { ISignupService } from "../../services/signup/service";
import { SignupController } from "./controller";

describe("Controller: Signup", () => {
	let controller: SignupController;
	let mockedService: Mocked<ISignupService>;
	let mockRequest: IRequest;

	beforeEach(() => {
		mockedService = {
			execute: vi.fn(),
		};

		mockRequest = {
			body: {},
			headers: {},
			params: {},
			queryParams: {},
			userId: null,
		};

		controller = new SignupController(mockedService);
	});

	afterEach(() => {
		vi.clearAllMocks();
		mockRequest.body = {};
	});

	it("should throw error when missing fields", async () => {
		// Arrange
		mockRequest.body = {
			...signupData,
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
			userId: "userId",
		});
		mockRequest.body = signupData;

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: { userId: "userId" },
		});
	});
});
