export function Reviews() {
	return (
		<div className="w-full flex flex-col items-center  bg-gray-50 rounded-[72px] py-10">
			<div className="max-w-[85rem] w-full">
				<div className="space-y-2 md:space-y-4 text-center mb-14">
					<span className="font-medium mb-6 block bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
						Nossos usuários
					</span>

					<h2 className="text-5xl font-medium text-gray-800 dark:text-gray-200 sm:text-5xl  md:text-5xl lg:text-5xl">
						Quem utilizar, já
						<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
							{" "}
							aprova
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
