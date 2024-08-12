import * as z from "zod";

export const RoleSchema = z.array(
	z.union([z.literal("COACH"), z.literal("ATHLETE"), z.literal("ADMIN")]),
);

/**
 * Role domain model
 */
export type Role = z.infer<typeof RoleSchema>;
