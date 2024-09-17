import { type Mocked, vi } from "vitest";
import {
	type IForgotPasswordInput,
	type IForgotPasswordService,
	ForgotPasswordService,
} from "./service";
import type { IAuthProvider } from "@application/providers/auth";

describe("Service:ForgotPassword", () => {
	let service: IForgotPasswordService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	const inputData: IForgotPasswordInput = {
		email: "john@email.com",
	};

	beforeEach(() => {
		mockedAuthProvider = {
			forgotPassword: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;
		service = new ForgotPasswordService(mockedAuthProvider);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call forgot password with correct email", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAuthProvider.forgotPassword).toHaveBeenCalledWith(
			inputData.email,
		);
	});
});
