import type { ISettingsRepository } from "@application/database/repositories/settings";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import { defaultSettings } from "../../constants/default-settings";
import {
	CreateSettingsService,
	type ICreateInput,
	type ICreateSettingsService,
} from "./service";

describe("Service:Create", () => {
	let service: ICreateSettingsService;
	let mockedSettingsRepository: Mocked<ISettingsRepository>;

	const inputData: ICreateInput = {
		userId: "96b820f4-e4a9-4c83-98b9-45f54b9f7e9a",
	};

	beforeEach(() => {
		mockedSettingsRepository = {
			create: vi.fn(),
			getByUserId: vi.fn(),
		} as unknown as Mocked<ISettingsRepository>;

		service = new CreateSettingsService(mockedSettingsRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when settingsRepository return exists settings", async () => {
		// Arrange
		mockedSettingsRepository.getByUserId.mockResolvedValue({
			userId: "userId",
		} as unknown as UnwrapPromise<
			ReturnType<ISettingsRepository["getByUserId"]>
		>);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Settings Already Exists",
		);
	});
	it("Should call settingsRepository with correct userId", async () => {
		// Arrange
		mockedSettingsRepository.getByUserId.mockResolvedValue(undefined);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedSettingsRepository.create).toHaveBeenCalledWith({
			...defaultSettings,
			userId: inputData.userId,
		});
	});
});
