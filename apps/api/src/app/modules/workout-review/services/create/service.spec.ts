import { type Mocked, vi } from "vitest";
import {
	type ICreateInput,
	type ICreateService,
	CreateService,
} from "./service";
import type { IAthleteRepository } from "@application/database/repositories/athlete";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	const inputData: ICreateInput = {
		athleteId: "123",
	};

	beforeEach(() => {
		mockedAthleteRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;

		service = new CreateService(mockedAthleteRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when athlete not found", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Athlete not found",
		);
	});
});
