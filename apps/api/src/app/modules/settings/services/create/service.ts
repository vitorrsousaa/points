import type { ISettingsRepository } from "@application/database/repositories/settings";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { defaultSettings } from "../../constants/default-settings";
import { SettingsAlreadyExists } from "../../errors/settings-already-exists";

export const CreateInputServiceSchema = z.object({
	userId: z.string().uuid(),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = null;

export type ICreateSettingsService = IService<ICreateInput, ICreateOutput>;

export class CreateSettingsService implements ICreateSettingsService {
	constructor(private readonly settingsRepository: ISettingsRepository) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const alreadyExists = await this.settingsRepository.getByUserId(
			createInput.userId,
		);

		if (alreadyExists) {
			throw new SettingsAlreadyExists();
		}

		await this.settingsRepository.create({
			...defaultSettings,
			userId: createInput.userId,
		});

		return null;
	}
}
