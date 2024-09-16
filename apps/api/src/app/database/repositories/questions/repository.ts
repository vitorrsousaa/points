import type { IDatabaseClient } from "@application/database/database";
import type { IQuestionRepository, QuestionDynamoDB } from "./types";
import type { Question } from "@core/domain/question";
import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";

export class QuestionRepository implements IQuestionRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}
	async getAll(): Promise<Question[]> {
		const result = await this.dbInstance.query<QuestionDynamoDB[]>({
			KeyConditionExpression: "PK = :primaryKey",
			ExpressionAttributeValues: {
				":primaryKey": "QUESTION",
			},
		});

		return result ? result.map(this.mapToDomain) : [];
	}

	async createLot(createInput: Omit<Question, "createdAt" | "id">[]) {
		const questions = createInput.map<QuestionDynamoDB>((question) => {
			const id = randomUUID();
			const now = new Date().toISOString();
			const { PK, SK } = this.getKeys(question.userId, id);

			return {
				id: id,
				created_at: now,
				answer: question.answer,
				question: question.question,
				user_id: question.userId,
				PK,
				SK,
			};
		});

		const putRequests = questions.map((question) => ({
			PutRequest: {
				Item: question,
			},
		}));

		const tableName = DATABASE_TABLE.TABLE_NAME;

		await this.dbInstance.batchWrite({
			RequestItems: {
				[tableName]: putRequests,
			},
		});

		return questions.map(this.mapToDomain);
	}

	async create(
		createInput: Omit<Question, "createdAt" | "id">,
	): Promise<Question> {
		const id = randomUUID();
		const { PK, SK } = this.getKeys(createInput.userId, id);
		const now = new Date().toISOString();

		const newUser: QuestionDynamoDB = {
			id: id,
			created_at: now,
			answer: createInput.answer,
			question: createInput.question,
			user_id: createInput.userId,
			PK,
			SK,
		};

		await this.dbInstance.create({
			...newUser,
		});

		return this.mapToDomain(newUser);
	}

	private mapToDomain(item: QuestionDynamoDB): Question {
		return {
			id: item.id,
			createdAt: item.created_at,
			answer: item.answer,
			question: item.question,
			userId: item.user_id,
		};
	}

	private getKeys(
		userId: string,
		questionId: string,
	): { PK: string; SK: string } {
		const now = new Date().toISOString();
		return {
			SK: `PROFILE|${userId}|QUESTION|${questionId}|${now}`,
			PK: "QUESTION",
		};
	}
}
