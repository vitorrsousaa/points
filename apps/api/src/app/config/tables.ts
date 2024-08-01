import { makeConfigEnvironment } from "@factories/config/environment";
import type { IConfig } from "./environment";

export interface IDatabaseTables {
	TABLE_NAME: string;
}

export class DatabaseTables implements IDatabaseTables {
	constructor(private readonly configuration: IConfig) {}

	public get TABLE_NAME(): string {
		const state = this.configuration.STAGE;

		return `TrainingTable-${state}`;
	}
}

export const DATABASE_TABLE = new DatabaseTables(makeConfigEnvironment());
