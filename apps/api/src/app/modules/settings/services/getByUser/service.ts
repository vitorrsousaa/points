import type { ISettingsRepository } from "@application/database/repositories/settings";
import type { IService } from "@application/interfaces/service";
import type { Settings } from "@core/domain/settings";
import * as z from "zod";

export const GetByUserInputServiceSchema = z.object({
	userId: z.string().uuid(),
});

export type TGetByUser = z.infer<typeof GetByUserInputServiceSchema>;

export type IGetByUserInput = TGetByUser;

export type IGetByUserOutput = Settings | null;

export type IGetByUserService = IService<IGetByUserInput, IGetByUserOutput>;

export class GetByUserService implements IGetByUserService {
	constructor(private readonly settingsRepository: ISettingsRepository) {}

	async execute(getByUserInput: IGetByUserInput): Promise<IGetByUserOutput> {
		return this.settingsRepository.getByUserId(getByUserInput.userId);
	}
}
