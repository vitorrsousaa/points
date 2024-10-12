import type { IUserRepository } from "@application/database/repositories/user";
import type { IEmailProvider } from "@application/providers/email/types";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	type ISendEmailAdminInput,
	type ISendEmailAdminService,
	SendEmailAdminService,
} from "./service";

describe("Service:SendEmailAdmin", () => {
	let service: ISendEmailAdminService;
	let mockedUserRepository: Mocked<IUserRepository>;
	let mockedEmailProvider: Mocked<IEmailProvider>;
	const inputData: ISendEmailAdminInput = {
		userId: "userId",
		audience: "ALL",
		templateId: "create-workout-review",
	};

	beforeEach(() => {
		mockedUserRepository = {
			getById: vi.fn(),
			getAll: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		mockedEmailProvider = {
			getTemplate: vi.fn(),
		} as unknown as Mocked<IEmailProvider>;

		service = new SendEmailAdminService(
			mockedUserRepository,
			mockedEmailProvider,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when user not found", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue(undefined);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow("User not found");
	});
	it("Should throw error when user is not admin", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			role: ["ATHLETE"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow("User not Admin");
	});
	it("Should not call emailProvider when userRepository return a empty array", async () => {
		// Arrange
		mockedUserRepository.getById.mockResolvedValue({
			role: ["ADMIN"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getById"]>>);
		mockedUserRepository.getAll.mockResolvedValue([]);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedEmailProvider.getTemplate).not.toHaveBeenCalled();
	});
});
