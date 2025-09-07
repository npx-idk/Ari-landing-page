import Image from "next/image";
import LogoLight from "../assets/logo/logo-light.png";
import LogoDark from "../assets/logo/logo-dark.png";
import LogoTextLight from "../assets/logo/logo-text-light.png";
import LogoTextDark from "../assets/logo/logo-text-dark.png";
import { useState } from "react";
import React from "react";

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
          src={isDarkMode ? LogoLight : LogoDark}
          alt="Logo"
          width={100}
          height={100}
          priority
          className="block lg:hidden h-10 w-10 object-contain"
        />
        <Image
          src={isDarkMode ? LogoTextLight : LogoTextDark}
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
