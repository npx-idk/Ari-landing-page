import Image from "next/image";
import AriLogo from "../assets/svg/ariLogo.svg";

const Logo = () => {
  return (
    <div className="relative h-10 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Image
          src={AriLogo}
          alt="Logo"
          width="0"
          height="0"
          sizes="50vw"
          priority
          className="w-10 h-10 block dark:hidden object-contain"
        />
        <span className="text-3xl font-bold hidden sm:inline dark:hidden">
          ARI AI
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={AriLogo}
          alt="Logo"
          width="0"
          height="0"
          sizes="50vw"
          className="w-10 h-10 hidden dark:block object-contain"
        />
        <span className="text-3xl font-bold hidden dark:sm:inline">ARI AI</span>
      </div>
    </div>
  );
};

export default Logo;
