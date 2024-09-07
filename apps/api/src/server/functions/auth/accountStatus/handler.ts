import { makeAccountStatusController } from "@factories/controllers/auth/accountStatus";
import { requestAdapter } from "@server/adapters/request";
import { responseAdapter } from "@server/adapters/response";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export async function handler(event: APIGatewayProxyEventV2) {
	const controller = makeAccountStatusController();

	const response = await controller.handle(requestAdapter(event));

	return responseAdapter(response);
}
