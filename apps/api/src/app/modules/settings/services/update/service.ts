import type { ISettingsRepository } from "@application/database/repositories/settings";
import type { IService } from "@application/interfaces/service";
import { SettingsSchema } from "@core/domain/settings";
import type * as z from "zod";
import { SettingsNotFound } from "../../errors/settings-not-found";

export const UpdateInputServiceSchema = SettingsSchema;

export type TUpdate = z.infer<typeof UpdateInputServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = null;

export type IUpdateService = IService<IUpdateInput, IUpdateOutput>;

export class UpdateService implements IUpdateService {
	constructor(private readonly settingsRepository: ISettingsRepository) {}

	async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
		const settings = await this.settingsRepository.getByUserId(
			updateInput.userId,
		);

		if (!settings) {
			throw new SettingsNotFound();
		}

		await this.settingsRepository.update(updateInput.userId, {
			...updateInput,
		});

		return null;
	}
}
