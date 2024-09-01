import { type Mocked, vi } from "vitest";
import {
	type IGetAthleteGrowthInput,
	type IGetAthleteGrowthService,
	GetAthleteGrowthService,
} from "./service";
import type { ICoachRepository } from "@application/database/repositories/coach";
import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { UnwrapPromise } from "@application/utils/types";
import { athleteMock } from "@application/shared/mocks/athlete";
import { getDateInTheLastMonth } from "@application/utils/date";

describe("Service:GetAthleteGrowth", () => {
	let service: IGetAthleteGrowthService;
	let mockedCoachRepository: Mocked<ICoachRepository>;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	const inputData: IGetAthleteGrowthInput = {
		coachId: "123",
	};
	const dateEndOfLastMonth = getDateInTheLastMonth().toISOString();
	const now = new Date().toISOString();

	beforeEach(() => {
		mockedCoachRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<ICoachRepository>;
		mockedAthleteRepository = {
			getAllByCoachId: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;

		service = new GetAthleteGrowthService(
			mockedCoachRepository,
			mockedAthleteRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when coach not found", async () => {
		// Arrange

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Coach not found",
		);
	});

	it("Should return growth = 0 when the coach doesnt have athletes", async () => {
		// Arrange
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([]);
		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(0).toFixed(2) });
	});

	it("Should return growth=100 when in the last month the coach has 0 athletes, and in the current month the coach has 2 athletes", async () => {
		// Arrange
		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([
			{
				...athleteMock,
				createdAt: now,
			},
			{
				...athleteMock,
				createdAt: now,
			},
		]);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(100).toFixed(2) });
	});

	it("Should return growth=-100 when in the last month the coach has 2 athletes, and in the current month the coach has 0 athletes", async () => {
		// Arrange
		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
		]);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(-100).toFixed(2) });
	});

	it("Should return growth=0 when in the last month the coach has 1 athlete, and in the current month the coach has 1 athlete", async () => {
		// Arrange
		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
			{
				...athleteMock,
				createdAt: now,
			},
		]);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(0).toFixed(2) });
	});

	it("Should return growth=100 when in the last month the coach has 1 athlete, and in the currentMonth the coach has 2 athletes", async () => {
		// Arrange

		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
			{
				...athleteMock,
				createdAt: now,
			},
			{
				...athleteMock,
				createdAt: now,
			},
		]);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(100).toFixed(2) });
	});

	it("Should return growth=-50 when in the last month the coach has 2 athlete, and in the currentMonth the coach has 1 athletes", async () => {
		// Arrange

		mockedCoachRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
		} as UnwrapPromise<ReturnType<ICoachRepository["getById"]>>);
		mockedAthleteRepository.getAllByCoachId.mockResolvedValue([
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
			{
				...athleteMock,
				createdAt: dateEndOfLastMonth,
			},
			{
				...athleteMock,
				createdAt: now,
			},
		]);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({ growth: Number(-50).toFixed(2) });
	});
});
