import type { Athlete } from "@core/domain/athlete";

export const athleteMock: Athlete = {
	id: "123",
	name: "John Doe",
	age: 30,
	weight: 80,
	height: 180,
	coachId: "456",
	email: "email@email.com",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	workoutCount: 0,
};
