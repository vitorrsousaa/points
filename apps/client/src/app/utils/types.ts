export type WithStatus<T> = T & { status?: Status };

export type Status = "pending" | "error";
