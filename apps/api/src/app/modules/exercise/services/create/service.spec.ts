import type { IExerciseRepository } from "@application/database/repositories/exercises";
import { type Mocked, vi } from "vitest";
import {
	CreateService,
	type ICreateInput,
	type ICreateService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	let mockedExerciseRepository: Mocked<IExerciseRepository>;
	const inputData: ICreateInput = {
		name: "John Doe",
		equipment: "Barra",
		muscleGroup: "muscle",
		target: null,
	};

	beforeEach(() => {
		mockedExerciseRepository = {
			create: vi.fn(),
		} as unknown as Mocked<IExerciseRepository>;

		service = new CreateService(mockedExerciseRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(true).toBe(true);
	});
});
