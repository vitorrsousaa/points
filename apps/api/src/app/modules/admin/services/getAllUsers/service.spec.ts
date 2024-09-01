import { type Mocked, vi } from "vitest";
import {
	type IGetAllUsersInput,
	type IGetAllUsersService,
	GetAllUsersService,
} from "./service";
import type { IUserRepository } from "@application/database/repositories/user";
import type { UnwrapPromise } from "@application/utils/types";

describe("Service:GetAllUsers", () => {
	let service: IGetAllUsersService;
	let mockedUserRepository: Mocked<IUserRepository>;
	const inputData: IGetAllUsersInput = {
		period: 1,
		userId: "123",
	};

	beforeEach(() => {
		mockedUserRepository = {
			getById: vi.fn(),
			update: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		service = new GetAllUsersService(mockedUserRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when user not exists", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue(undefined);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"User not found",
		);
	});

	it("Should throw error when user returned by the repository not is admin", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			role: ["ATHLETE", "COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrowError(
			"User not Admin",
		);
	});
});
