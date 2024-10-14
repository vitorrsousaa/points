import { TEMPLATES } from "@shared/transactional";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Icon,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Spinner,
} from "@shared/ui";
import { useState } from "react";

const audienceTypes = [
	{ id: "all", name: "Todos os usuários" },
	{ id: "coachs", name: "Treinadores" },
	{ id: "athletes", name: "Atletas" },
];

export function EmailScreen() {
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [subject, setSubject] = useState("");
	const [selectedAudience, setSelectedAudience] = useState("");
	const [isSending] = useState(false);

	const handleSendEmail = async () => {
		if (!selectedTemplate || !subject || !selectedAudience) {
			alert("Por favor, preencha todos os campos.");
			return;
		}

		// Simular o envio do e-mail
		await new Promise((resolve) => setTimeout(resolve, 2000));
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Criar Campanha de E-mail</CardTitle>
				<CardDescription>
					Selecione um template, defina o assunto e escolha o público-alvo.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="template">Template de E-mail</Label>
					<Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
						<SelectTrigger id="template">
							<SelectValue placeholder="Selecione um template" />
						</SelectTrigger>
						<SelectContent>
							{TEMPLATES.map((template) => (
								<SelectItem key={template.value} value={template.value}>
									{template.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="subject">Assunto do E-mail</Label>
					<Input
						id="subject"
						placeholder="Digite o assunto do e-mail"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="audience">Público-alvo</Label>
					<Select onValueChange={setSelectedAudience} value={selectedAudience}>
						<SelectTrigger id="audience">
							<SelectValue placeholder="Selecione o público-alvo" />
						</SelectTrigger>
						<SelectContent>
							{audienceTypes.map((audience) => (
								<SelectItem key={audience.id} value={audience.id}>
									{audience.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					className="w-full"
					onClick={handleSendEmail}
					disabled={isSending}
				>
					{isSending ? (
						<>
							<Spinner className="mr-2 h-4 w-4" />
							Enviando...
						</>
					) : (
						<>
							{/* <Send  /> */}
							<Icon name="paperPlane" className="mr-2 h-4 w-4" />
							Disparar E-mail
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}
