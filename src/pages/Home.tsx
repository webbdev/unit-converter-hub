import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const generalTools = [
	{ id: "gt-1", name: "Length", path: "/length", icon: "📏" },
	{ id: "gt-2", name: "Weight", path: "/weight", icon: "⚖️" },
	{ id: "gt-3", name: "Temperature", path: "/temperature", icon: "🌡️" },
	{ id: "gt-4", name: "Data Storage", path: "/data-storage", icon: "💾" },
	{ id: "gt-5", name: "Speed", path: "/speed", icon: "⚡" },
	{ id: "gt-6", name: "Time", path: "/time", icon: "⏱️" },
];

const developerTools = [
	{ id: "dt-1", name: "PX - REM + PX\u00a0-\u00a0EM", path: "/px-rem-em", icon: "🖥️" },
	{ id: "dt-2", name: "Tailwind\u00a0-\u00a0Px", path: "/tailwind-px", icon: "🌀" },
	{ id: "dt-3", name: "Color Converter", path: "/color", icon: "🎨" },
	// { id: "dt-4", name: "Viewport Converter", path: "/viewport", icon: "📐" },
];

const textTools = [
	{ id: "tc-1", name: "PDF → Text", path: "/pdf-converter", icon: "📄" }
];

const Home = () => {
	const [showAll, setShowAll] = useState(false);
	const [visibleCount, setVisibleCount] = useState(window.innerWidth < 640 ? 2 : 3);

	useEffect(() => {
		const handleResize = () => {
			setVisibleCount(window.innerWidth < 640 ? 2 : 3);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const visibleTools = showAll ? developerTools : developerTools.slice(0, visibleCount);

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, duration: 0.4 },
		}),
		exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
	};

	return (
		<div className="mt-0 sm:mt-6 mb-14 sm:mb-20">
			{/* Hero Section */}
			<div className="rounded-2xl text-center py-6 sm:p-10 mb-4 sm:mb-12">
				<h1 className="text-[30px] sm:text-[58px] md:text-[68px] leading-[1.15] mb-5">
					Convert Units Instantly
				</h1>
				<p className="max-w-[300px] sm:max-w-xl mx-auto text-[16px] sm:text-[18px]">
					Fast, accurate converters for developers and everyday users.
				</p>
			</div>

			{/* General Tools */}
			<section id="general" className="scroll-mt-24 text-center mb-14 sm:mb-18">
				<h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10">
					General Units
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
					{generalTools.map((tool) => (
						<Link
							key={tool.id}
							to={tool.path}
							className="group px-1 py-5 sm:py-8 rounded-2xl border bg-[#ddccc2] hover:bg-transparent shadow hover:shadow transition"
						>
							<div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
								{tool.icon}
							</div>
							<h3 className="text-base sm:text-lg sm:tracking-[0.8px]">
								<span className="relative">
									{tool.name}
									<span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
								</span>
							</h3>
						</Link>
					))}
				</div>
			</section>

			{/* Developer Tools */}
			<section id="developer" className="scroll-mt-24 text-center mb-14 sm:mb-17">
				<h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10">
					Developer / Designer Units
				</h2>

				<motion.div
					layout
					className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
				>
					<AnimatePresence>
						{visibleTools.map((tool, i) => (
							<motion.div
								key={tool.id}
								custom={i}
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={cardVariants}
							>
								<Link
									to={tool.path}
									className="group block px-1 py-5 sm:py-8 rounded-2xl border bg-[#ddccc2] hover:bg-transparent shadow hover:shadow transition"
								>
									<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
										{tool.icon}
									</div>
									<h3 className="text-base sm:text-lg sm:tracking-[0.8px]">
										<span className="relative">
											{tool.name}
											<span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
										</span>
									</h3>
								</Link>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* See More Button (only visible before click) */}
				<AnimatePresence>
					{!showAll && (
						<motion.div
							key="see-more"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="mt-12 text-center"
						>
							<button
								onClick={() => setShowAll(true)}
								className="group rounded-3xl px-10 py-3 border bg-transparent hover:bg-[#ddccc2] transition"
							>
								<span className="relative">
									See More
									<span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
								</span>
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</section>

			{/* Text & File Tools */}
			<section id="text" className="scroll-mt-24 text-center mb-14 sm:mb-17">
				<h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10">
					Text & File Tools
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
					{textTools.map((tool) => (
						<Link
							key={tool.id}
							to={tool.path}
							className="group px-1 py-5 sm:py-8 rounded-2xl border bg-[#ddccc2] hover:bg-transparent shadow hover:shadow transition"
						>
							<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
								{tool.icon}
							</div>
							<h3 className="text-base sm:text-lg sm:tracking-[0.8px]">
								<span className="relative">
									{tool.name}
									<span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
								</span>
							</h3>
						</Link>
					))}
				</div>
			</section>

		</div>
	);
};

export default Home;