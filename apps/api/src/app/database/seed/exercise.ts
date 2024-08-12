import type { ExercisePersistance } from "../repositories/exercises";

export const seedExercises: ExercisePersistance[] = [
	{
		equipment: "Barra",
		muscleGroup: "Dorsal",
		target: "D",
		name: "Pendlay Row",
	},
	{
		equipment: "Barra",
		muscleGroup: "Peito",
		target: "B",
		name: "Supino Reto",
	},
	{
		equipment: "Halter",
		muscleGroup: "Peito",
		target: "B",
		name: "Supino Reto com Halteres",
	},
	{
		equipment: "Barra",
		muscleGroup: "Quadriceps",
		target: "S",
		name: "Front Squat",
	},
	{
		equipment: "Maquina",
		muscleGroup: "Quadriceps",
		target: null,
		name: "Leg Press",
	},
	{
		equipment: "Halter",
		muscleGroup: "Ombro",
		target: null,
		name: "Elevação lateral",
	},
	{
		equipment: "Halter",
		muscleGroup: "Ombro",
		target: null,
		name: "Desenvolvimento com Halteres",
	},
];
