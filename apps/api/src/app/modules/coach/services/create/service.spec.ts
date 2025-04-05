import type { ICoachRepository } from "@application/database/repositories/coach";
import type { ICreateService as ICreateAthleteService } from "@application/modules/athlete/services/create";
import type { ISignupService } from "@application/modules/auth/services/signup";
import { type Mocked, vi } from "vitest";
import { inputData } from "../../mocks/coach";
import { CreateService, type ICreateService } from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedSignupService: Mocked<ISignupService>;
	let mockedCreateAthleteService: Mocked<ICreateAthleteService>;
	let mockedCoachRepository: Mocked<ICoachRepository>;

	beforeEach(() => {
		mockedSignupService = {
			execute: vi.fn(),
		} as unknown as Mocked<ISignupService>;

		mockedCreateAthleteService = {
			execute: vi.fn(),
		} as unknown as Mocked<ICreateAthleteService>;

		mockedCoachRepository = {
			create: vi.fn(),
		} as unknown as Mocked<ICoachRepository>;

		service = new CreateService(
			mockedSignupService,
			mockedCreateAthleteService,
			mockedCoachRepository,
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
