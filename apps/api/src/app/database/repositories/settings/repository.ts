import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import { AppError } from "@application/errors/app-error";
import type { Settings } from "@core/domain/settings";
import type { User } from "@core/domain/user";
import type { UserDynamoDB } from "../user";
import type { ISettingsRepository, SettingsDynamoDB } from "./types";

export class SettingsRepository implements ISettingsRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(
		createInput: Omit<Settings, "id" | "createdAt" | "updatedAt">,
	): Promise<Settings> {
		const settingsId = randomUUID();
		const { PK, SK } = this.getKeys(createInput.userId);
		const now = new Date().toISOString();

		const newSettings: SettingsDynamoDB = {
			onboarding: createInput.onboarding,
			user_id: createInput.userId,
			created_at: now,
			updated_at: now,
			id: settingsId,
			PK,
			SK,
		};

		await this.dbInstance.create(this.TABLE_NAME, {
			...newSettings,
		});

		return this.mapToDomain(newSettings);
	}

	async update(
		userId: string,
		updateInput: Omit<Settings, "id">,
	): Promise<Settings> {
		const { PK, SK } = this.getKeys(userId);
		const now = new Date().toISOString();

		try {
			await this.dbInstance.update(this.TABLE_NAME, {
				Key: { PK, SK },
				UpdateExpression:
					"set #onboarding = :onboarding, #updated_at = :updated_at",
				ExpressionAttributeNames: {
					"#onboarding": "onboarding",
					"#updated_at": "updated_at",
				},
				ExpressionAttributeValues: {
					":onboarding": updateInput.onboarding,
					":updated_at": now,
				},
			});

			const newSettings: SettingsDynamoDB = {
				id: userId,
				onboarding: updateInput.onboarding,
				user_id: updateInput.userId,
				updated_at: now,
				created_at: updateInput.createdAt,
				PK,
				SK,
			};

			return this.mapToDomain(newSettings);
		} catch {
			throw new AppError("Settings not found", 404);
		}
	}

	async getByUserId(userId: string): Promise<Settings | null> {
		const { PK, SK } = this.getKeys(userId);

		const item = await this.dbInstance.get<SettingsDynamoDB>(this.TABLE_NAME, {
			Key: { PK, SK },
		});

		return item ? this.mapToDomain(item) : null;
	}

	private mapToDomain(item: SettingsDynamoDB): Settings {
		return {
			onboarding: item.onboarding,
			id: item.id,
			userId: item.user_id,
			createdAt: item.created_at,
			updatedAt: item.updated_at,
		};
	}

	private getKeys(id: string): { PK: string; SK: string } {
		return {
			PK: this.setUserId(id),
			SK: "SETTINGS",
		};
	}

	private setUserId(id: string): string {
		return `${this.DEFAULT_USER_ID}|${id}`;
	}
}
