import { vi } from "vitest";
import type { ICreateService } from "./service";

describe("Service:Create", () => {
	let service: ICreateService;
	// const inputData: ICreateInput = {
	// 	name: 'John Doe'
	// }

	beforeEach(() => {
		// service = new CreateService();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act
		// await service.execute(inputData);

		// Assert
		expect(true).toBe(true);
	});
});
