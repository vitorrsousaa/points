"use client";

export function Features() {
	return (
		<div className="mx-auto w-10/12 max-w-4xl" id="funcionalidades">
			{/*<!-- Grid --> */}
			<div className=" xl:items-center xl:gap-8">
				{/*<!-- End Col --> */}

				<div className="mt-5 sm:mt-10 xl:col-span-5 xl:mt-0">
					<div className="space-y-6 sm:space-y-8">
						{/*<!-- Title --> */}
						<div className="space-y-2 md:space-y-4 text-center">
							<span className="font-medium mb-6 block bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
								Nossas vantagens
							</span>

							<h2 className="text-5xl font-medium text-gray-800 dark:text-gray-200 sm:text-5xl  md:text-5xl lg:text-5xl">
								Uma nova forma de
								<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
									{" "}
									cuidar
									<br />
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
										<h4 className="font-medium text-2xl mb-1">
											Cuide de seus atletas
										</h4>

										<span className="text-muted-foreground text-pretty">
											Organize e gerencie cada um deles em um só lugar.
										</span>
									</div>

									<img src="athletes.png" title="Atletas" alt="Atletas" />
								</div>
							</div>

							<div className="flex items-center gap-4 h-[340px]">
								<div className="flex-1 h-full border rounded-xl p-6 bg-gray-50 gap-4 flex flex-col">
									<div>
										<h4 className="font-medium text-2xl mb-2">Análises</h4>

										<span className="text-muted-foreground text-pretty">
											Saiba como está sua evolução.
										</span>
									</div>

									<img src="graph.png" alt="Análises" title="Análises" />
								</div>

								<div className="flex-[2] overflow-hidden h-full border rounded-xl pt-6 px-6 bg-gray-50 space-y-4">
									<div>
										<h4 className="font-medium text-2xl mb-2">
											Treinos individuais
										</h4>

										<span className="text-muted-foreground text-pretty">
											Crie treinos individuais personalizados que atendam
											exatamente às necessidades de cada aluno.
										</span>
									</div>

									<img src="training.png" title="Treinos" alt="Treinos" />
								</div>
							</div>

							<div className="flex items-center gap-4 ">
								<div className="h-80 flex-1 border rounded-xl pt-6 px-6 bg-gray-50 flex justify-between items-center gap-4">
									<div>
										<h4 className="font-medium text-2xl mb-2">
											Aplicativo para o aluno
										</h4>
										<span className="text-muted-foreground text-pretty">
											Permita que seu aluno veja o treino rapidamente.
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
				{/*<!-- End Col --> */}
			</div>
		</div>
	);
}
