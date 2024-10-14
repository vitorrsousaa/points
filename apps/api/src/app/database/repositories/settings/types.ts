import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Settings } from "@core/domain/settings";

export type SettingsDynamoDB = Prettify<
	{
		created_at: string;
		updated_at: string;
		user_id: string;
		preferences_email: Settings["preferencesEmail"];
	} & TBaseEntity &
		Omit<Settings, "createdAt" | "updatedAt" | "userId" | "preferencesEmail">
>;

export interface ISettingsRepository {
	create(
		createInput: Omit<Settings, "id" | "createdAt" | "updatedAt">,
	): Promise<Settings>;
	update(userId: string, updateInput: Omit<Settings, "id">): Promise<Settings>;
	getByUserId(userId: string): Promise<Settings | null>;
}
