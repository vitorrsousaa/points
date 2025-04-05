import type { IQuestionRepository } from "@application/database/repositories/questions";
import { type Mocked, vi } from "vitest";
import {
	GetAllService,
	type IGetAllInput,
	type IGetAllService,
} from "./service";

describe("Service:GetAll", () => {
	let service: IGetAllService;
	let mockedQuestionRepository: Mocked<IQuestionRepository>;
	const inputData: IGetAllInput = {
		userId: "John Doe",
	};

	beforeEach(() => {
		mockedQuestionRepository = {
			getAll: vi.fn(),
		} as unknown as Mocked<IQuestionRepository>;
		service = new GetAllService(mockedQuestionRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call question repository when call service", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedQuestionRepository.getAll).toHaveBeenCalledTimes(1);
	});
});
