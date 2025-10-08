import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
		// Delay to wait until DOM is ready
			setTimeout(() => {
				const target = document.getElementById(hash.replace("#", ""));
				if (target) {
					target.scrollIntoView({ behavior: "smooth" });
				}
			}, 150);
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [pathname, hash]);

	return null;
};

export default ScrollToTop;
