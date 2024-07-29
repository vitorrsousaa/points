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
				title: "Controller Name",
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
						content: (inputs) => `export * from "./controller";
`,
					},
					{
						type: "file",
						name: "controller.ts",
						content: (inputs) => `import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";

export class ${toPascalCase(inputs.name)}Controller implements IController {
  constructor() {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const [status, parsedBody] = missingFields(Schema, request.body)
      
			if (!status) return parsedBody;

      const service = await this.service.execute(parsedBody)
      
			return {
				statusCode: 200,
				body: service
			};
    } catch (error) {
      return errorHandler(error);
    }
  }
}
`,
					},
					{
						type: "file",
						name: "controller.spec.ts",
						content: (inputs) =>
							`import type { IRequest } from "@application/interfaces/http";
import type { Mocked } from "vitest";

import { ${toPascalCase(inputs.name)}Controller } from './controller';

describe('Controller: ${toPascalCase(inputs.name)}', () => {
  let mockRequest: IRequest
  let controller: ${toPascalCase(inputs.name)}Controller;
  let mockedService: Mocked<I${toPascalCase(inputs.name)}Service>;

  beforeEach(() => {
    mockRequest = {
			body: {},
			headers: {},
			params: {},
			queryParams: {},
			userId: null,
		};

    mockedService = {
			execute: vi.fn(),
		};

    controller = new ${toPascalCase(inputs.name)}Controller(mockedService);
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockRequest.body = {};
  })

  it("should throw error when missing fields", async () => {
		// Arrange
		mockRequest.body = {
			email: undefined,
		};

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({ statusCode: 422 });
	});

  it("should return response with correct return of service when fields are ok", async () => {
		// Arrange
		mockedService.execute.mockResolvedValue({ });
    mockRequest.body = {
    
    };

		// Act
		const result = await controller.handle(mockRequest);

		// Assert
		expect(result).toMatchObject({
			statusCode: 200,
			body: {  },
		});
	});
});
`,
					},
				],
			},
		],
	};
});
