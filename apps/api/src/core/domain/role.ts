import * as z from "zod";

export const roleSchema = z.array(
	z.union([z.literal("COACH"), z.literal("ATHLETE"), z.literal("ADMIN")]),
);

/**
 * Role type
 */
export type TRole = z.infer<typeof roleSchema>;
