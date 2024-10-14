export function Header() {
	return (
		<header className="sticky top-0 z-50 p-4 bg-background/60 backdrop-blur">
			<div className="flex justify-between items-center container max-w-[1200px] max-lg:p-0">
				<a
					title="brand-logo"
					className="relative mr-6 flex items-center space-x-2"
					href="/"
				>
					<img
						src="black-logo.png"
						alt="GRYPP"
						title="GRYPP"
						style={{ maxWidth: 130 }}
					/>
				</a>
				<div className="hidden lg:block">
					<div className="flex items-center">
						<nav
							aria-label="Main"
							data-orientation="horizontal"
							dir="ltr"
							className="relative z-10 flex max-w-max flex-1 items-center justify-center"
						>
							<div>
								<ul
									data-orientation="horizontal"
									className="group flex flex-1 list-none items-center justify-center space-x-1"
									dir="ltr"
								>
									<li>
										<a
											href="#hero"
											id="radix-:R34cv6ja:-trigger-radix-:R2r4cv6ja:"
											data-state="closed"
											aria-expanded="false"
											aria-controls="radix-:R34cv6ja:-content-radix-:R2r4cv6ja:"
											className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 group"
											data-radix-collection-item=""
										>
											Início
										</a>
									</li>
									<li>
										<a
											href="#funcionalidades"
											className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10"
											data-radix-collection-item=""
										>
											Funcionalidades
										</a>
									</li>

									<li>
										<a
											href="#precos"
											id="radix-:R34cv6ja:-trigger-radix-:R4r4cv6ja:"
											data-state="closed"
											aria-expanded="false"
											aria-controls="radix-:R34cv6ja:-content-radix-:R4r4cv6ja:"
											className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 group"
											data-radix-collection-item=""
										>
											Preços
										</a>
									</li>
									<li>
										<a
											className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10"
											href="#duvidas"
											data-radix-collection-item=""
										>
											Dúvidas
										</a>
									</li>
								</ul>
							</div>
							<div className="absolute left-0 top-full flex justify-center"></div>
						</nav>
						<div className="gap-4 flex ml-8">
							<a
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
								href="https://app.grypp.com.br/login"
								target="_blank"
							>
								Entrar
							</a>
							<a
								className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto text-background flex gap-2"
								href="https://app.grypp.com.br/registrar"
								target="_blank"
							>
								Criar Conta
							</a>
						</div>
					</div>
				</div>
				<div className="cursor-pointer block lg:hidden">
					<div className="gap-4 flex ml-8">
							<a
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
								href="https://app.grypp.com.br/login"
								target="_blank"
							>
								Entrar
							</a>
							<a
								className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto text-background flex gap-2"
								href="https://app.grypp.com.br/registrar"
								target="_blank"
							>
								Criar Conta
							</a>
						</div>
				</div>
			</div>
		</header>
	);
}
