import { ROUTES } from "@/config/routes";
import { Button, Icon, Input } from "@shared/ui";
import { Link } from "react-router-dom";

export function ExercisesTableHeader() {
	return (
		<div className="w-full flex items-center justify-end gap-2">
			<div className="flex items-center gap-2">
				{/* <Controller
					name="search"
					control={searchControl}
					render={({ field }) => ( */}
				<Input
					className="h-9 w-50 lg:w-72 border bg-transparent"
					placeholder="Busque pelo nome..."
					type="text"
					// {...field}
				/>
				{/* )}
				/> */}

				<Link to={ROUTES.EXERCISES}>
					<Button size="sm" className="h-9 gap-1">
						<Icon name="plusCircle" className="h-5 w-5" />
						<span className="sr-only md:not-sr-only md:whitespace-nowrap">
							Adicionar exercício
						</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
