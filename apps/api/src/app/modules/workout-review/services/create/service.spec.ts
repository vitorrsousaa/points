import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IHistoryExerciseRepository } from "@application/database/repositories/history-exercise";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import { workoutExerciseInput } from "@application/modules/workout/mocks/create";
import type { IEmailProvider } from "@application/providers/email/types";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	type ICreateInput,
	type ICreateService,
	CreateService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;
	let mockedWorkoutReviewRepository: Mocked<IWorkoutReviewRepository>;
	let mocketHistoryExerciseRepository: Mocked<IHistoryExerciseRepository>;
	let mocketWorkoutRepository: Mocked<IWorkoutRepository>;
	let mockedEmailProvider: Mocked<IEmailProvider>;
	let mockedUserRepository: Mocked<IUserRepository>;
	const inputData: ICreateInput = {
		athleteId: "123",
		coachId: "456",
		notes: "Some notes",
		workoutId: "789",
		endTime: new Date().getTime(),
		startTime: new Date().getTime(),
		realizedExercises: [workoutExerciseInput],
	};

	beforeEach(() => {
		mockedAthleteRepository = {
			getById: vi.fn(),
			update: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;
		mockedWorkoutReviewRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IWorkoutReviewRepository>;
		mocketHistoryExerciseRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IHistoryExerciseRepository>;
		mocketWorkoutRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IWorkoutRepository>;
		mockedEmailProvider = {
			render: vi.fn(),
			send: vi.fn(),
		} as unknown as Mocked<IEmailProvider>;
		mockedUserRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		service = new CreateService(
			mockedAthleteRepository,
			mockedWorkoutReviewRepository,
			mocketWorkoutRepository,
			mocketHistoryExerciseRepository,
			mockedEmailProvider,
			mockedUserRepository,
		);
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
	it("Should throw error when athlete is owned other coach", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue({
			name: "John Doe",
			coachId: "123",
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Athlete is not assigned to this coach",
		);
	});
	it("Should throw error when athlete is owned coach but workout dont exists", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue({
			name: "John Doe",
			coachId: inputData.coachId,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);
		mocketWorkoutRepository.getById.mockResolvedValue(null);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Workout not found",
		);
	});
	it("Should throw error when athlete is owned coach, but workout is owned other coach", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue({
			name: "John Doe",
			coachId: inputData.coachId,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);
		mocketWorkoutRepository.getById.mockResolvedValue({
			coachId: "789",
		} as unknown as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"Workout is not assigned to this coach",
		);
	});
	it("Should update athleteRepository with one unit more on workout count", async () => {
		// Arrange
		const DEFAULT_WORKOUT_COUNT = 98;
		mockedAthleteRepository.getById.mockResolvedValue({
			workoutCount: DEFAULT_WORKOUT_COUNT,
			name: "John Doe",
			coachId: inputData.coachId,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);
		mocketWorkoutRepository.getById.mockResolvedValue({
			coachId: inputData.coachId,
			exercises: [],
			volume: {},
			id: "workoutId",
		} as unknown as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);
		mockedWorkoutReviewRepository.create.mockResolvedValue({
			id: "workoutReviewId",
		} as unknown as UnwrapPromise<
			ReturnType<IWorkoutReviewRepository["create"]>
		>);
		mockedUserRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
			email: "john@email.com",
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAthleteRepository.update).toHaveBeenCalledWith(
			expect.objectContaining({
				workoutCount: DEFAULT_WORKOUT_COUNT + 1,
				name: "John Doe",
			}),
		);
	});
	it("Should call workoutReviewRepository with reviewed as false by default", async () => {
		// Arrange
		mockedAthleteRepository.getById.mockResolvedValue({
			name: "John Doe",
			coachId: inputData.coachId,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);
		mocketWorkoutRepository.getById.mockResolvedValue({
			coachId: inputData.coachId,
			exercises: [],
			volume: {},
			id: "workoutId",
		} as unknown as UnwrapPromise<ReturnType<IWorkoutRepository["getById"]>>);
		mockedWorkoutReviewRepository.create.mockResolvedValue({
			id: "workoutReviewId",
		} as unknown as UnwrapPromise<
			ReturnType<IWorkoutReviewRepository["create"]>
		>);
		mockedUserRepository.getById.mockResolvedValue({
			id: "123",
			name: "John Doe",
			email: "john@email.com",
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedWorkoutReviewRepository.create).toHaveBeenCalledWith(
			expect.objectContaining({
				reviewed: false,
			}),
		);
	});
});
