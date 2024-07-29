(function Template() {
	const toPascalCase = (str) =>
		str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase())
			.replace(/\W+/g, "");

	const toCamelCase = (str) =>
		toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());

	return {
		userInputs: [
			{
				title: "Service Name",
				argumentName: "name",
				defaultValue: "Sample",
			},
		],
		template: [
			{
				type: "folder",
				name: (inputs) => `${toCamelCase(inputs.name)}`,
				children: [
					{
						type: "file",
						name: "index.ts",
						content: (inputs) => `export * from "./service";
`,
					},
					{
						type: "file",
						name: "service.ts",
						content: (inputs) => `import type { IService } from "@application/interfaces/service";
import * as z from 'zod';

export const ${toPascalCase(inputs.name)}InputServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type T${toPascalCase(inputs.name)} = z.infer<typeof ${toPascalCase(
							inputs.name,
						)}InputServiceSchema>;

export type I${toPascalCase(inputs.name)}Input = T${toPascalCase(inputs.name)};

export interface I${toPascalCase(inputs.name)}Output {
  name: string;
}

export type I${toPascalCase(inputs.name)}Service = IService<I${toPascalCase(
							inputs.name,
						)}Input, I${toPascalCase(inputs.name)}Output>;

export class ${toPascalCase(inputs.name)}Service implements I${toPascalCase(
							inputs.name,
						)}Service {
  constructor() {}

  async execute(${toCamelCase(inputs.name)}Input: I${toPascalCase(
		inputs.name,
	)}Input): Promise<I${toPascalCase(inputs.name)}Output> {
    return {
      name: ${toCamelCase(inputs.name)}Input.name,
    };
  }
}
`,
					},
					{
						type: "file",
						name: "service.spec.ts",
						content: (inputs) => `import { type Mocked, vi } from "vitest";
import { 
	type I${toPascalCase(inputs.name)}Input,
	type I${toPascalCase(inputs.name)}Service,
	${toPascalCase(inputs.name)}Service 
} from './service';

describe('Service:${toPascalCase(inputs.name)}', () => {
	let service: I${toPascalCase(inputs.name)}Service;
	const inputData: I${toPascalCase(inputs.name)}Input = {
		name: 'John Doe'
	}
		
	beforeEach(() => {
		service = new ${toPascalCase(inputs.name)}Service();
	});
	
	afterEach(() =>{
		vi.clearAllMocks();
	});
	
	it('Should correct', async () =>{
		// Arrange
		
		// Act
		await service.execute(inputData);
		
		// Assert
		expect(true).toBe(true);
	})
})
`,
					},
				],
			},
		],
	};
});
