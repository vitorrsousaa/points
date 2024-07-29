import type { IUserRepository } from "@application/database/repositories/user";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	type IProfileInput,
	type IProfileService,
	ProfileService,
} from "./service";

describe("Service:Profile", () => {
	let service: IProfileService;
	let mockedUserRepository: Mocked<IUserRepository>;
	const inputData: IProfileInput = {
		userId: "123",
	};

	const defaultUser: UnwrapPromise<ReturnType<IUserRepository["getById"]>> = {
		accountConfirmation: true,
		email: "email",
		id: "123",
		name: "name",
		role: ["ADMIN"],
	};

	beforeEach(() => {
		mockedUserRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		mockedUserRepository.getById.mockResolvedValue(defaultUser);

		service = new ProfileService(mockedUserRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should return the user when profile is called correctly", async () => {
		// Arrange

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual(defaultUser);
	});
	it("Should call `userRepository.getById` with correct parameters", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedUserRepository.getById).toHaveBeenCalledWith(inputData.userId);
	});
});
