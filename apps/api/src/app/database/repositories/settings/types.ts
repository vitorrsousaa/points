import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Settings } from "@core/domain/settings";

export type SettingsDynamoDB = Prettify<
	{
		created_at: string;
		updated_at: string;
		user_id: string;
	} & TBaseEntity &
		Omit<Settings, "createdAt" | "updatedAt" | "userId">
>;

export interface ISettingsRepository {
	create(
		createInput: Omit<Settings, "id" | "createdAt" | "updatedAt">,
	): Promise<Settings>;
	update(userId: string, updateInput: Omit<Settings, "id">): Promise<Settings>;
	getById(userId: string): Promise<Settings | undefined>;
}
