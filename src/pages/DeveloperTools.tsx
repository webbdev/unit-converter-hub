import { Link } from "react-router-dom";

const developerTools = [
	{ id: "dt-1", name: "PX ↔ REM", path: "/px-rem", icon: "🖥️" },
	{ id: "dt-2", name: "PX ↔ EM", path: "/px-em", icon: "🖥️" },
	{ id: "dt-3", name: "Viewport Converter", path: "/viewport", icon: "📐" },
	{ id: "dt-4", name: "Color Converter", path: "/color", icon: "🎨" },
];

const DeveloperTools = () => {
	return (
		<div className="mt-10 mb-20">
			{/* Developer Tools */}
			<section className="text-center mb-16">
				<h2 className="text-4xl mb-12">Developer / Designer Units</h2>
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
					{developerTools.map((tool) => (
						<Link
							key={tool.path}
							to={tool.path}
							className="px-6 py-8 rounded-2xl border bg-[#DDCCC2] hover:bg-[#c6bbfd] shadow hover:shadow-lg transition"
						>
							<div className="text-4xl mb-3">{tool.icon}</div>
							<h3 className="text-lg font-semibold tracking-[1px]">{tool.name}</h3>
						</Link>
					))}
				</div>
			</section>

			<div className="mx-auto">
				<div className="text-center">
					<Link
						to="/"
						className="rounded-3xl px-10 py-3 border bg-transparent hover:bg-[#c6bbfd]"
					>
						See General Tools
					</Link>
				</div>
			</div>
		</div>
	)
}

export default DeveloperTools