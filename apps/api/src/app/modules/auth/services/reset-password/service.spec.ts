import { type Mocked, vi } from "vitest";
import { type IResetPasswordService, ResetPasswordService } from "./service";
import type { IAuthProvider } from "@application/providers/auth";

describe("Service:ResetPassword", () => {
	let service: IResetPasswordService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	// const inputData: IResetPasswordInput = {
	// 	name: 'John Doe'
	// }

	beforeEach(() => {
		mockedAuthProvider = {
			resetPassword: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;
		service = new ResetPasswordService(mockedAuthProvider);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act

		// Assert
		expect(true).toBe(true);
	});
});
