import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "./Container";

type Section = {
	id: string;
	label: string;
};

const sections: Section[] = [
	{ id: "general", label: "General Units" },
	{ id: "developer", label: "Developer Units" },
	{ id: "text", label: "Text Convert" },
];

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

	// Prevent background scroll on mobile menu
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
	}, [isOpen]);

	const toggleMenu = () => setIsOpen((prev) => !prev);

	// Detect scroll direction & active section
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 70);
			setPrevScrollPos(currentScrollPos);

			// active section detection
			let currentActive = "";
			for (let section of sections) {
				const element = document.getElementById(section.id);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 100 && rect.bottom >= 100) {
						currentActive = section.id;
						break;
					}
				}
			}
			setActiveSection(currentActive);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	// Smooth scroll (works on homepage)
	const scrollToSection = (sectionId: string) => {
		const target = document.getElementById(sectionId);
		if (target) {
			window.scrollTo({
				top: target.offsetTop - 60,
				behavior: "smooth",
			});
		}
	};

	// Handle link click
	const handleLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string
	) => {
		e.preventDefault();
		setIsOpen(false);

		if (location.pathname !== "/") {
			navigate(`/#${sectionId}`);
		} else {
			scrollToSection(sectionId);
		}
	};

	 // Scroll to section if hash exists on load
	useEffect(() => {
		if (location.pathname === "/" && location.hash) {
			const id = location.hash.replace("#", "");
			setTimeout(() => scrollToSection(id), 150);
		}
	}, [location]);

	// Scroll to top for logo
	const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsOpen(false);

		if (location.pathname !== "/") {
			navigate("/");
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<header
			className={`sticky top-0 z-50 transition-transform duration-300 ${
				visible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<Container>
				<div className="flex justify-between items-center py-3 sm:py-5">
					<a
						href="/"
						onClick={handleHomeClick}
						className="text-2xl sm:text-2xl underline underline-offset-4 decoration-[#efadbd]"
					>
						Convertly
					</a>

					<nav aria-label="Main Navigation">
						<ul
							className={`fixed inset-0 h-screen bg-[#32312f] text-[#fbf5ed] 
								flex flex-col items-center sm:justify-center pt-22 sm:pt-0 
								transform transition-transform duration-400 ease-in
								sm:static sm:h-auto sm:flex sm:flex-row sm:space-x-8 
								sm:bg-transparent sm:text-black sm:translate-y-0
								${isOpen ? "translate-y-0" : "-translate-y-full sm:translate-y-0"}`}
						>
							{sections.map(({ id, label }) => (
								<li 
									key={id}
									className="py-6 sm:p-0 border-b border-b-0.5 sm:border-0 w-[60%] sm:w-auto text-center"
								>
									<a
										href={`#${id}`}
										onClick={(e) => handleLinkClick(e, id)}
										className={`group relative transition-colors ${
											activeSection === id
												? "text-[#efadbd] sm:text-black "
												: "hover:text-[#fbf5ed] sm:hover:text-black"
										}`}
									>
										{label}
										<span
											className={`absolute left-0 -bottom-1 h-[2px] bg-[#efadbd] transition-all duration-300 ${
												activeSection === id ? "w-full" : "w-0 group-hover:w-full"
											}`}
										></span>
									</a>
								</li>
							))}
						</ul>

					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						aria-expanded={isOpen}
						aria-label="Toggle Menu"
						className="sm:hidden py-2 z-50"
					>
						<svg
							className="w-7 h-7"
							fill="none"
							stroke={isOpen ? "#fbf5ed" : "black"}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d={
								isOpen
									? "M6 18L18 6M6 6l12 12" // close
									: "M4 6h16M4 12h16m-7 6h7" // burger
								}
							/>
						</svg>
					</button>
				</div>
			</Container>
		</header>
	);
};

export default Header;



