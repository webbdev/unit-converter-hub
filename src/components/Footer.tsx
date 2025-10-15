import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "./Container";

// Define type for footer links
type FooterLink = {
	id: string;
	label: string;
	to: string;
};

const footerLinks: FooterLink[] = [
	{ id: "f1", label: "Terms of Service", to: "/terms" },
	{ id: "f2", label: "Privacy Policy", to: "/privacy-policy" },
	{ id: "f3", label: "Cookie Policy", to: "/cookie-policy" },
	{ id: "f4", label: "Accessibility Statement", to: "/accessibility" },
];

const Footer: React.FC = () => {
	const [showButton, setShowButton] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowButton(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="relative mb-0 sm:mb-7.5 rounded-2xl">
			<Container>
				<div className="relative text-center rounded-2xl bg-black/80 text-[#fbf5ed] px-5.5 sm:px-10">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-11 sm:pt-12 lg:pt-14 pb-11 sm:pb-12 lg:pb-13">
						
						{/* Brand */}
						<div className="text-left">
							<Link
								to="/"
								className="text-2xl underline underline-offset-4 decoration-[#efadbd]"
							>
								Convertly
							</Link>
						</div>

						{/* Links */}
						<div className="text-left md:px-4 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{footerLinks.map(({ id, label, to }: FooterLink) => (
								<Link
									key={id}
									to={to}
									className="text-[15px] sm:text-base hover:underline underline-offset-2"
								>
									{label}
								</Link>
							))}
						</div>
					</div>

					{/* Copyright */}
					<div className="border-t border-t-white py-6 text-left sm:text-center">
						<p className="text-sm text-[#fbf5ed] tracking-[0.8px] sm:tracking-[1px]">
							© {new Date().getFullYear()} by Convertly. Built by
							<a
								href=""
								target="_blank"
								rel="noopener noreferrer"
								className="ml-1 text-brand underline underline-offset-2"
							>
								Tanya
							</a>.
						</p>
					</div>

					{/* Back to Top Button */}
					{showButton && (
						<button
							onClick={scrollToTop}
							className="absolute right-[12px] sm:right-[20px] xl:right-[-100px] bottom-3.5 sm:bottom-3 bg-[#efadbd] text-black px-2.5 sm:px-4 xl:px-5 py-2 xl:py-3 rounded-full shadow-lg hover:bg-[#f5c4d1] transition"
							aria-label="Back to top"
						>
							↑ Top
						</button>
					)}

				</div>
			</Container>
		</footer>
	);
};

export default Footer;