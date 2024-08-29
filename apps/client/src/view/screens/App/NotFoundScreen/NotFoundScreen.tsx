import { useNavigate } from "@/hooks/navigate";
import { Button, Icon } from "@shared/ui";

export function NotFoundScreen() {
	const { navigate } = useNavigate();

	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
			<div className="flex flex-col items-center">
				<Icon name="exclamationTriangle" className="h-10 w-10" />
				<h1 className="text-2xl font-bold my-4">Ooops! Algo deu errado!</h1>
				<p className="mb-6 text-lg">
					Nós não conseguimos encontrar a página que você está procurando.
				</p>
			</div>

			<Button onClick={() => navigate("DASHBOARD")}>
				Voltar para a Página Inicial
			</Button>
		</div>
	);
}
