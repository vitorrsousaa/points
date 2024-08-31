import { type Mocked, vi } from "vitest";
import {
	type IUpdateInput,
	type IUpdateService,
	UpdateService,
} from "./service";
import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { UnwrapPromise } from "@application/utils/types";

describe("Service:Update", () => {
	let service: IUpdateService;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	const inputData: IUpdateInput = {
		coachId: "123",
		id: "123",
		age: 20,
		height: 180,
		weight: 80,
		workoutCount: 10,
	};

	beforeEach(() => {
		mockedAthleteRepository = {
			getById: vi.fn(),
			update: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;

		service = new UpdateService(mockedAthleteRepository);
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

	it("Should call athlete repository with new values", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue({
			id: "atleta",
			coachId: "123",
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAthleteRepository.update).toHaveBeenCalledWith({
			...inputData,
			id: "atleta",
		});
	});
});
