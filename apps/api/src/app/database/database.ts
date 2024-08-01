import {
	DeleteCommand,
	type DeleteCommandInput,
	type DynamoDBDocumentClient,
	GetCommand,
	type GetCommandInput,
	PutCommand,
	QueryCommand,
	type QueryCommandInput,
	ScanCommand,
	type ScanCommandInput,
	UpdateCommand,
	type UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

export type TBaseEntity = {
	SK: string;
	PK: string;
};

export interface IDatabaseClient {
	create<T extends TBaseEntity>(
		tableName: string,
		attributes: T,
	): Promise<void>;
	update(
		tableName: string,
		args: Omit<UpdateCommandInput, "TableName">,
	): Promise<void>;
	query<T>(
		tableName: string,
		args: Omit<QueryCommandInput, "TableName">,
	): Promise<T | undefined>;
	scan<T>(
		tableName: string,
		args: Omit<ScanCommandInput, "TableName">,
	): Promise<T | undefined>;
	get<T>(
		tableName: string,
		args: Omit<GetCommandInput, "TableName">,
	): Promise<T | undefined>;
}

export class DatabaseClient implements IDatabaseClient {
	constructor(private readonly dynamoClient: DynamoDBDocumentClient) {}

	async create<T extends TBaseEntity>(tableName: string, attributes: T) {
		const command = new PutCommand({
			TableName: tableName,
			Item: {
				...attributes,
			},
		});

		await this.dynamoClient.send(command);
	}

	async update(tableName: string, args: Omit<UpdateCommandInput, "TableName">) {
		const updateCommand = new UpdateCommand({
			TableName: tableName,
			...args,
		});

		await this.dynamoClient.send(updateCommand);
	}

	async query<T>(
		tableName: string,
		args: Omit<QueryCommandInput, "TableName">,
	): Promise<T | undefined> {
		const command = new QueryCommand({
			TableName: tableName,
			...args,
		});

		const { Items } = await this.dynamoClient.send(command);

		return Items as T | undefined;
	}

	async scan<T>(
		tableName: string,
		args: Omit<ScanCommandInput, "TableName">,
	): Promise<T | undefined> {
		const command = new ScanCommand({
			TableName: tableName,
			...args,
		});

		const { Items } = await this.dynamoClient.send(command);

		return Items as T | undefined;
	}

	async get<T>(
		tableName: string,
		args: Omit<GetCommandInput, "TableName">,
	): Promise<T | undefined> {
		const command = new GetCommand({
			TableName: tableName,
			...args,
		});

		const { Item } = await this.dynamoClient.send(command);

		return Item as T | undefined;
	}
}
