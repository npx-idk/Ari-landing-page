import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative h-10 w-32">
      <Image
        src="assets/images/logo-black.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100vw"
        priority
        className="w-full h-7 block dark:hidden object-contain"
      />
      <Image
        src="assets/images/logo-white.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-7 hidden dark:block object-contain"
      />
    </div>
  );
};

export default Logo;
