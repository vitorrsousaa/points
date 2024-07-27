import type { User } from "./user";

export type Doctor = Omit<User, "doctorId">;
