import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	ForgotPasswordInputServiceSchema,
	type IForgotPasswordService,
} from "../../services/forgot-password";

export class ForgotPasswordController implements IController {
	constructor(private readonly service: IForgotPasswordService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				ForgotPasswordInputServiceSchema,
				request.body,
			);

			if (!status) return parsedBody;

			await this.service.execute(parsedBody);

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}
