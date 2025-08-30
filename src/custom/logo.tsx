import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative h-10 w-32 flex items-center justify-center">
      <Image
        src="assets/images/logo-black.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100vw"
        priority
        className="w-full h-full block dark:hidden object-contain"
      />
      <Image
        src="assets/images/logo-white.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-full hidden dark:block object-contain"
      />
    </div>
  );
};

export default Logo;
