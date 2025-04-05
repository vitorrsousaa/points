import type { ICustomExerciseRepository } from "@application/database/repositories/custom-exercises";
import { type Mocked, vi } from "vitest";
import {
	CreateService,
	type ICreateInput,
	type ICreateService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedCustomExerciseRepository: Mocked<ICustomExerciseRepository>;
	const inputData: ICreateInput = {
		name: "John Doe",
		coachId: "123",
		equipment: "Barra",
		primaryMuscle: "Biceps",
		secondaryMuscle: "Triceps",
		target: "B",
	};

	beforeEach(() => {
		mockedCustomExerciseRepository = {
			create: vi.fn(),
		} as unknown as Mocked<ICustomExerciseRepository>;
		service = new CreateService(mockedCustomExerciseRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedCustomExerciseRepository.create).toHaveBeenCalledWith(
			inputData,
		);
	});
});
