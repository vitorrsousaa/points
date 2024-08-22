import { type Mocked, vi } from "vitest";
import { type ICreateService, CreateService } from "./service";
import type { ICreateService as ICreateAthleteService } from "@application/modules/athlete/services/create";
import type { ISignupService } from "@application/modules/auth/services/signup";
import { inputData } from "../../mocks/coach";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedSignupService: Mocked<ISignupService>;
	let mockedCreateAthleteService: Mocked<ICreateAthleteService>;

	beforeEach(() => {
		mockedSignupService = {
			execute: vi.fn(),
		} as unknown as Mocked<ISignupService>;

		mockedCreateAthleteService = {
			execute: vi.fn(),
		} as unknown as Mocked<ICreateAthleteService>;

		service = new CreateService(
			mockedSignupService,
			mockedCreateAthleteService,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call signupService with COACH role", async () => {
		// Arrange
		mockedSignupService.execute.mockResolvedValue({ userId: "123" });

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedSignupService.execute).toHaveBeenCalledWith({
			...inputData,
			role: ["COACH"],
		});
	});
});
