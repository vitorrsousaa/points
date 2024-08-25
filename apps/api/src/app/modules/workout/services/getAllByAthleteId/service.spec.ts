import { type Mocked, vi } from "vitest";
import {
	GetAllByAthleteIdService,
	type IGetAllByAthleteIdInput,
	type IGetAllByAthleteIdService,
} from "./service";
import type { IWorkoutRepository } from "@application/database/repositories/workout";

describe("Service:GetAllByAthleteId", () => {
	let service: IGetAllByAthleteIdService;
	let mockedWorkoutRepository: Mocked<IWorkoutRepository>;
	const inputData: IGetAllByAthleteIdInput = {
		athleteId: "123",
	};

	beforeEach(() => {
		mockedWorkoutRepository = {
			getAllByAthleteId: vi.fn(),
			getAllActiveByAthleteId: vi.fn(),
		} as unknown as Mocked<IWorkoutRepository>;

		service = new GetAllByAthleteIdService(mockedWorkoutRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call 'getAllByAthleteId' when athleteId is defined and status is not defined", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedWorkoutRepository.getAllByAthleteId).toHaveBeenCalledWith(
			inputData.athleteId,
		);
	});
	it("Should call 'getAllActiveByAthleteId' when athleteId is defined and status defined as active", async () => {
		// Arrange

		// Act
		await service.execute({ ...inputData, status: "active" });

		// Assert
		expect(
			mockedWorkoutRepository.getAllActiveByAthleteId,
		).toHaveBeenCalledWith(inputData.athleteId);
	});
});
