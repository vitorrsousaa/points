import { ROUTES } from "@/config/routes";
import { useCallback } from "react";

import { useNavigate as useNavigateRouter } from "react-router-dom";

type TRoute = (typeof ROUTES)[keyof typeof ROUTES] extends string
	? (typeof ROUTES)[keyof typeof ROUTES]
	: never;

export function replaceRouteParams(
	route: TRoute,
	params: Record<string, string>,
): string {
	let originalRoute = route;

	Object.entries(params).map(([key, value]) => {
		originalRoute = originalRoute.replace(`:${key}`, value) as TRoute;
	});

	return originalRoute;
}

type RouteKey = keyof typeof ROUTES;

type GetPath<R extends RouteKey> = (typeof ROUTES)[R];

type ExtractPathParams<R extends string> =
	R extends `${infer _}:${infer Param}/${infer Rest}`
		? { [K in Param]: string } & ExtractPathParams<Rest>
		: R extends `${infer _}:${infer Param}`
			? { [K in Param]: string }
			: undefined;

interface NavigateOptions<TRouteKey extends string> {
	replace?: ExtractPathParams<TRouteKey>;
	state?: Record<string, unknown>;
}

export function useNavigate() {
	const navigateRouter = useNavigateRouter();

	const navigate = useCallback(
		<T extends RouteKey>(
			route: keyof typeof ROUTES,
			options?: NavigateOptions<GetPath<T>>,
		) => {
			navigateRouter(
				replaceRouteParams(ROUTES[route], options?.replace || {}),
				{
					state: options?.state,
				},
			);
		},
		[navigateRouter],
	);

	return {
		navigate,
	};
}
