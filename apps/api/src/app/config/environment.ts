import dotenv from "dotenv";
import * as z from "zod";

export const envSchema = z.object({
	COGNITO_POOL_CLIENT_ID: z.string(),
	COGNITO_POOL_ID: z.string(),
	STAGE: z.literal("dev").or(z.literal("prod")),
	RESEND_API_KEY: z.string(),
});

dotenv.config();

try {
	envSchema.parse(process.env);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error("Error on environment variables:", error.errors);
		process.exit(1);
	}
}

export interface IConfig {
	COGNITO_POOL_CLIENT_ID: string;
	COGNITO_POOL_ID: string;
	STAGE: string;
	RESEND_API_KEY: string;
}

export class Config implements IConfig {
	public COGNITO_POOL_CLIENT_ID = process.env.COGNITO_POOL_CLIENT_ID as string;
	public COGNITO_POOL_ID = process.env.COGNITO_POOL_ID as string;
	public STAGE = process.env.STAGE as string;
	public RESEND_API_KEY = process.env.RESEND_API_KEY as string;
}
