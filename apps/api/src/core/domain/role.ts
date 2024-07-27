import * as z from "zod";

export const roleSchema = z.array(
	z.union([z.literal("PATIENT"), z.literal("DOCTOR"), z.literal("ADMIN")]),
);

/**
 * Role type
 */
export type TRole = z.infer<typeof roleSchema>;
