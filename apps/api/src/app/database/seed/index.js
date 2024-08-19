import dotenv from "dotenv"; // Use import para módulos ES
import fetch from "node-fetch"; // Use import para módulos ES
import { seedExercises } from "./exercise.js";

dotenv.config();

async function runSeed() {
	console.log("Running seed...");
	// const url = "https://6lm5kscc2m.execute-api.us-east-1.amazonaws.com/exercise";

	console.log("Validations...");

	seedExercises.forEach((exercise, index) => {
		if (!exercise.name) throw new Error(`Exercise index-${index} has no name`);
		if (!exercise.primaryMuscle && exercise.primaryMuscle.length === 0)
			throw new Error(`Exercise ${exercise.name} has no primary muscle`);
		if (
			exercise.equipment !== "Barra" &&
			exercise.equipment !== "Maquina" &&
			exercise.equipment !== "Halter"
		)
			throw new Error(`Exercise ${exercise.name} has invalid equipment`);

		if (exercise.secondaryMuscle && exercise.secondaryMuscle.length === 0)
			throw new Error(`Exercise ${exercise.name} has no secondary muscle`);

		if (
			exercise.target &&
			exercise.target !== "S" &&
			exercise.target !== "D" &&
			exercise.target !== "B"
		)
			throw new Error(`Exercise ${exercise.name} has no target`);
	});

	console.log("Validations done");

	const baseURL = process.env.API_URL;
	const url = `${baseURL}/exercise`;

	try {
		await Promise.all(
			seedExercises.map(async (exercise) => {
				console.log("Creating exercise", exercise.name);
				try {
					const response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(exercise),
					});
					console.log(response.status);
				} catch (error) {
					console.error(`Error on exercise ${exercise.name}: ${error.message}`);
				}
			}),
		);
	} catch (error) {
		console.error(`Error during seed operation: ${error.message}`);
	}

	console.log("Seed done.");
}

runSeed();
