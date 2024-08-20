import type { ISettingsRepository } from "@application/database/repositories/settings";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import { defaultSettings } from "../../constants/default-settings";
import {
	type IUpdateInput,
	type IUpdateService,
	UpdateService,
} from "./service";

describe("Service:Update", () => {
	let service: IUpdateService;
	let mockedSettingsRepository: Mocked<ISettingsRepository>;

	const userId = "96b820f4-e4a9-4c83-98b9-45f54b9f7e9a";
	const now = new Date().toISOString();
	const inputData: IUpdateInput = {
		...defaultSettings,
		createdAt: now,
		updatedAt: now,
		userId,
		id: userId,
	};

	beforeEach(() => {
		mockedSettingsRepository = {
			getByUserId: vi.fn(),
			update: vi.fn(),
		} as unknown as Mocked<ISettingsRepository>;

		service = new UpdateService(mockedSettingsRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when settings not exists for this user", async () => {
		// Arrange
		mockedSettingsRepository.getByUserId.mockResolvedValue(undefined);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Settings Not Found",
		);
	});

	it("Should call repository with correct parameters", async () => {
		// Arrange
		mockedSettingsRepository.getByUserId.mockResolvedValue({
			id: userId,
		} as unknown as UnwrapPromise<
			ReturnType<ISettingsRepository["getByUserId"]>
		>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedSettingsRepository.update).toHaveBeenCalledWith(
			userId,
			inputData,
		);
	});
});
