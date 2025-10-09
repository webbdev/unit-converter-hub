import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => (
	<div 
		className="max-w-5xl mx-auto w-full px-5.5 md:px-7.5"
	>
		{children}
	</div>
);

export default Container;
