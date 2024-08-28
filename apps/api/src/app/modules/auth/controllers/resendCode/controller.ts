import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	type IResendCodeService,
	ResendCodeInputServiceSchema,
} from "../../services/resendCode";

export class ResendCodeController implements IController {
	constructor(private readonly service: IResendCodeService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(ResendCodeInputServiceSchema, {
				email: request.params.email,
			});

			if (!status) return parsedBody;

			await this.service.execute(parsedBody);

			return {
				statusCode: 201,
				body: null,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}
