import { makeConfigEnvironment } from "@factories/config/environment";
import type { IConfig } from "./environment";

export interface IDatabaseTables {
	USERS: string;
}

export class DatabaseTables implements IDatabaseTables {
	constructor(private readonly configuration: IConfig) {}

	public get USERS(): string {
		const state = this.configuration.STAGE;

		return `TrainingUsersTable-${state}`;
	}
}

export const DATABASE_TABLE = new DatabaseTables(makeConfigEnvironment());
