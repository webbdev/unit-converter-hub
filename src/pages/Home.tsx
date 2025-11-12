import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const toolsData = [
	{
		id: "general",
		title: "General Units",
		showSeeMore: false,
		tools: [
			{ id: "gt-1", name: "Length", path: "/length", icon: "📏" },
			{ id: "gt-2", name: "Weight", path: "/weight", icon: "⚖️" },
			{ id: "gt-3", name: "Temperature", path: "/temperature", icon: "🌡️" },
			{ id: "gt-4", name: "Data Storage", path: "/data-storage", icon: "💾" },
			{ id: "gt-5", name: "Speed", path: "/speed", icon: "⚡" },
			{ id: "gt-6", name: "Time", path: "/time", icon: "⏱️" },
		],
	},
	{
		id: "developer",
		title: "Developer / Designer Units",
		showSeeMore: true,
		tools: [
			{ id: "dt-1", name: "PX - REM + PX - EM", path: "/px-rem-em", icon: "🖥️" },
			{ id: "dt-2", name: "Tailwind - Px", path: "/tailwind-px", icon: "🌀" },
			{ id: "dt-3", name: "Color Converter", path: "/color", icon: "🎨" },
			{ id: "dt-4", name: "Viewport Converter", path: "/viewport", icon: "📐" },
		],
	},
	{
		id: "text",
		title: "Text Converters",
		showSeeMore: true,
		tools: [
			{ id: "tc-1", name: "PDF → Text", path: "/pdf-converter", icon: "📰" },
			{ id: "tc-2", name: "Text → PDF", path: "/txt-converter", icon: "📄" },
			{ id: "tc-3", name: "Image → Text", path: "/img-converter", icon: "🖼️" }
			// { id: "tc-4", name: "Word → PDF", path: "/word-converter", icon: "📘" },
		],
	},
];

const Home = () => {
	const [visibleCount, setVisibleCount] = useState(window.innerWidth < 640 ? 4 : 3);
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

	useEffect(() => {
		const handleResize = () => setVisibleCount(window.innerWidth < 640 ? 4 : 3);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, duration: 0.4 },
		}),
		exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
	};

	const toggleSection = (id: string) => {
		setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<div className="mt-0 mb-14 sm:mb-20">
			{/* Hero Section */}
			<div className="text-center mx-auto mt-6 sm:mt-16 lg:mt-18 xl:mt-20 mb-10 sm:mb-20 lg:mb-24">
				<h1 className="text-[36px] xs:text-[40px] sm:text-[66px] md:text-[72px] lg:text-[80px] leading-[1.15] mb-4 sm:mb-5">
					Convert Instantly
				</h1>
				<p className="max-w-[300px] sm:max-w-[380px] md:max-w-xl mx-auto text-[16px] sm:text-[18px]">
					From units to text — fast, accurate conversions in one simple tool.
				</p>
			</div>

			{/* Dynamic Sections */}
			{toolsData.map((section) => {
				const showAll = expandedSections[section.id];

				// ✅ Show all for "General Units", sliced only for other sections
				const visibleTools =
					section.showSeeMore && !showAll
						? section.tools.slice(0, visibleCount)
						: section.tools;

				return (
					<section
						key={section.id}
						id={section.id}
						className="scroll-mt-24 text-center mb-14 sm:mb-17"
					>
						<h2 className="text-2xl sm:text-3xl mb-6 sm:mb-10">
							{section.title}
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

						{/* See More Button (only for developer & text sections) */}
						{section.showSeeMore && section.tools.length > visibleCount && (
							<AnimatePresence>
								{!showAll && (
									<motion.div
										key={`see-more-${section.id}`}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
										className="mt-12 text-center"
									>
										<button
											onClick={() => toggleSection(section.id)}
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
						)}
					</section>
				);
			})}
		</div>
	);
};

export default Home;