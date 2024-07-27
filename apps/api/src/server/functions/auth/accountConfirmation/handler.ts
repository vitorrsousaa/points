import { makeAccountConfirmationController } from "@factories/controllers/auth/accountConfirmation";
import { requestAdapter } from "@server/adapters/request";
import { responseAdapter } from "@server/adapters/response";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export async function handler(event: APIGatewayProxyEventV2) {
	const controller = makeAccountConfirmationController();

	const response = await controller.handle(requestAdapter(event));

	return responseAdapter(response);
}
