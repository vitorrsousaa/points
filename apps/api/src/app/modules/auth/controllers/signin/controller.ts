import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	type ISigninService,
	SigninInputServiceSchema,
} from "../../services/signin";

export class SigninController implements IController {
	constructor(private readonly signinService: ISigninService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				SigninInputServiceSchema,
				request.body,
			);

			if (!status) return parsedBody;

			const service = await this.signinService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}
