import { type Mocked, vi } from "vitest";
import {
	type IGetAllInput,
	type IGetAllService,
	GetAllService,
} from "./service";
import type { ICustomExerciseRepository } from "@application/database/repositories/custom-exercises";

describe("Service:GetAll", () => {
	let service: IGetAllService;
	let mockedCustomExerciseRepository: Mocked<ICustomExerciseRepository>;
	const inputData: IGetAllInput = {
		userId: "c6d090ee-ed4d-426c-92eb-6a9856646c75",
	};

	beforeEach(() => {
		mockedCustomExerciseRepository = {
			getAll: vi.fn(),
		} as unknown as Mocked<ICustomExerciseRepository>;

		service = new GetAllService(mockedCustomExerciseRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call customExerciseRepository with the correct id", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedCustomExerciseRepository.getAll).toHaveBeenCalledWith(
			inputData.userId,
		);
	});
});
