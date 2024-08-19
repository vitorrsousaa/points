import type { ReactNode } from "react";

interface RenderIfElseProps {
	condition: boolean;
	ifRender: ReactNode;
	elseRender: ReactNode;
}

export function RenderIfElse({
	condition,
	ifRender,
	elseRender,
}: RenderIfElseProps) {
	return condition ? ifRender : elseRender;
}
