"use client";

export function Features() {
	return (
		<div className="mx-auto max-w-[1120px] w-full" id="funcionalidades">
			<div className="space-y-6 sm:space-y-8">
				{/*<!-- Title --> */}
				<div className="space-y-2 md:space-y-4 text-center max-w-[848px] mx-auto">
					<span className="font-medium mb-6 block bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
						Nossas vantagens
					</span>

					<h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-800 dark:text-gray-200">
						Uma abordagem inovadora para
						<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
							{" "}
							cuidar{" "}
						</span>
						dos seus alunos
					</h2>
					<p className="text-gray-500 text-center">
						Explore uma forma fácil e intuitiva de gerenciar seus alunos.
						Organize treinos, planeje atividades e acompanhe o progresso de
						maneira eficiente e sem complicação.
					</p>
				</div>
				{/*<!-- End Title --> */}

				{/*<!-- List --> */}

				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="h-80 overflow-hidden flex-1 border rounded-xl p-6 bg-gray-50 flex flex-col gap-4">
							<div>
								<h4 className="font-semibold text-2xl mb-1 tracking-tight">
									Cuide de seus atletas
								</h4>

								<span className="text-muted-foreground text-pretty">
									Organize e gerencie cada um deles em um só lugar.
								</span>
							</div>

							<img src="athletes.png" title="Atletas" alt="Atletas" />
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center gap-4 md:h-[340px]">
						<div className="flex-1 max-md:w-full h-full border rounded-xl p-6 bg-gray-50 gap-4 flex flex-col">
							<div>
								<h4 className="font-semibold text-2xl mb-1 tracking-tight">
									Análises
								</h4>

								<span className="text-muted-foreground text-pretty">
									Saiba como está sua evolução.
								</span>
							</div>

							<img
								src="graph.png"
								alt="Análises"
								title="Análises"
								className=""
							/>
						</div>

						<div className="flex-1 max-md:w-full h-full border rounded-xl p-6 bg-[#1E1E1E] gap-4 flex items-center justify-center">
							<img src="white-logo.png" alt="GRYPP" title="GRYPP" />
						</div>

						<div className="flex-[2] overflow-hidden h-full border rounded-xl pt-6 px-6 bg-gray-50 space-y-4">
							<div>
								<h4 className="font-semibold text-2xl mb-1 tracking-tight">
									Treinos individuais
								</h4>

								<span className="text-muted-foreground text-pretty">
									Crie treinos individuais personalizados que atendam exatamente
									às necessidades de cada aluno.
								</span>
							</div>

							<img src="training.png" title="Treinos" alt="Treinos" />
						</div>
					</div>

					<div className="flex items-center gap-4 ">
						<div className="h-80 flex-1 border rounded-xl pt-6 px-6 bg-gray-50 flex justify-between items-center gap-4 flex-col md:flex-row">
							<div className="md:w-[50%] w-full">
								<h4 className="font-semibold text-2xl mb-1 tracking-tight">
									Tudo na palma da mão
								</h4>
								<span className="text-muted-foreground text-pretty">
									<strong className="font-semibold">Praticidade</strong> para o
									aluno.
									<br />
									<br />
									Permita que o aluno veja todas as informações do treino
									rapidamente.
								</span>
							</div>

							<img
								src="mobile-app.png"
								alt="Mobile"
								title="Mobile"
								className="w-[380px] h-full object-cover object-top"
							/>
						</div>
					</div>
				</div>

				{/*<!-- End List --> */}
			</div>
		</div>
	);
}
