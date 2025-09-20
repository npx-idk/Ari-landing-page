import Image from "next/image";
import React, { useState } from "react";
import OldLogoTextDark from "../assets/logo/old-logo-text-dark.png";
import OldLogoTextLight from "../assets/logo/old-logo-text-light.png";
import OldLogo from "../assets/logo/old-logo.png";

const useIsDarkMode = () => {
	const [isDark, setIsDark] = useState(false);

	if (typeof window !== "undefined" && typeof document !== "undefined") {
		// noop just to satisfy types in environments that SSR the file
	}

	React.useEffect(() => {
		const root = document.documentElement;
		const update = () => setIsDark(root.classList.contains("dark"));
		update();

		const observer = new MutationObserver(update);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });

		return () => observer.disconnect();
	}, []);

	return isDark;
};

const Logo = () => {
	const isDarkMode = useIsDarkMode();

	return (
		<div className="relative h-10 flex items-center justify-center">
			<div className="flex items-center gap-2">
				<Image
					src={OldLogo}
					alt="Logo"
					width={100}
					height={100}
					priority
					className="block lg:hidden h-10 w-10 object-contain"
				/>
				<Image
					src={isDarkMode ? OldLogoTextLight : OldLogoTextDark}
					alt="Logo Text"
					width={140}
					height={40}
					className="hidden lg:block h-8 w-auto object-contain"
				/>
			</div>
		</div>
	);
};

export default Logo;
