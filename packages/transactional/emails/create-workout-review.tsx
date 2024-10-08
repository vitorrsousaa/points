import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

interface CreateWorkoutReviewProps {
	athleteName: string;
	athleteEmail: string;
	workoutReviewId: string;
	workoutName: string;
	workoutDescription: string;
}

const baseUrl = "https://app.grypp.com.br";

export const CreateWorkoutReview = ({
	athleteName = "Nome do atleta",
	athleteEmail = "atleta@email.com",
	workoutReviewId = "workoutReviewId",
	workoutName = "workoutName",
	workoutDescription = "Descrição não disponível",
}: CreateWorkoutReviewProps) => {
	const previewText = `Novo Treino Cadastrado por ${athleteName}`;

	const reviewUrl = `${baseUrl}/revisoes/editar/${workoutReviewId}`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/logo.svg`}
								width="40"
								height="37"
								alt="Logo"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Treino <strong>cadastrado</strong> para revisão
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Olá Treinador,
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							O atleta <strong>{athleteName}</strong> (
							<span className="text-blue-600 no-underline">{athleteEmail}</span>
							) cadastrou um novo treino para revisão.
						</Text>
						<Section>
							<Row>
								<Text>Informações do treino:</Text>
								<Column align="left" className="gap-0 space-y-0">
									<div>
										<Text>
											<strong>Nome:</strong> {workoutName}
										</Text>
										<Text>
											<strong>Descrição:</strong> workout description
										</Text>
									</div>
								</Column>
							</Row>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Acesse o link abaixo, ou copie e cole no seu navegador:{" "}
							<Link href={reviewUrl} className="text-blue-600 no-underline">
								{reviewUrl}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Este é um e-mail enviado automaticamente pelo{" "}
							<span className="text-black">Grypp </span>. Se você preferir não
							receber mais notificações como esta, pode desabilitar as
							notificações por e-mail acessando a página de{" "}
							<span className="text-black">preferências</span> dentro da
							plataforma.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default CreateWorkoutReview;
