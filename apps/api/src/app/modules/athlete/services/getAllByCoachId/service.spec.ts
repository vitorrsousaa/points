import type { IAthleteRepository } from "@application/database/repositories/athlete";
import { type Mocked, vi } from "vitest";
import {
	GetAllByCoachIdService,
	type IGetAllByCoachIdInput,
	type IGetAllByCoachIdService,
} from "./service";

describe("Service:GetAllByCoachId", () => {
	let service: IGetAllByCoachIdService;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	const inputData: IGetAllByCoachIdInput = {
		coachId: "123",
	};

	beforeEach(() => {
		mockedAthleteRepository = {
			getAllByCoachId: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;

		service = new GetAllByCoachIdService(mockedAthleteRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call athlete repository with correct coach id", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAthleteRepository.getAllByCoachId).toHaveBeenCalledWith(
			inputData.coachId,
		);
	});
});
