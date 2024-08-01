export type Equipment = "Barra" | "Halter" | "Maquina";

export type Exercise = {
	name: string;
	equipment: Equipment;
	muscleGroup: string;
	target: string | null;
	id: string;
};
