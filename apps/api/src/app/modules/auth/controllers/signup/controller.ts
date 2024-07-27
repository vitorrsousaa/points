import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "../../../../utils/error-handler";
import { missingFields } from "../../../../utils/missing-fields";
import {
	type ISignupService,
	SignupInputSchema,
} from "../../services/signup/service";

export class SignupController implements IController {
	constructor(private readonly signupService: ISignupService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				SignupInputSchema,
				request.body,
			);

			if (!status) return parsedBody;

			const service = await this.signupService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}
