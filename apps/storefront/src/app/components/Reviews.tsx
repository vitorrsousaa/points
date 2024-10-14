export function Reviews() {
	return (
		<div className="w-full flex flex-col items-center px-4 md:px-0 bg-gray-50 rounded-[32px] md:rounded-[72px] py-10">
			<div className="max-w-[85rem] w-full">
				<div className="space-y-2 md:space-y-4 text-center mb-10 md:mb-14">
					<span className="font-medium mb-6 block bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
						Nossos usuários
					</span>

					<h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-gray-800 dark:text-gray-200">
						Quem usa,
						<span className="bg-gradient-to-tl  font-bold from-primary to-orange-600 bg-clip-text text-transparent">
							{" "}
							ama!
						</span>
					</h2>
				</div>

				<script
					src="https://widget.senja.io/widget/762e8f95-064a-4462-8797-5ac926efd880/platform.js"
					type="text/javascript"
					async
				/>
				<div
					className="senja-embed"
					data-id="762e8f95-064a-4462-8797-5ac926efd880"
					data-mode="shadow"
					data-lazyload="false"
					style={{ display: "block" }}
				/>
			</div>
		</div>
	);
}
