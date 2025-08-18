import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="assets/images/logo-black.svg"
        className="block dark:hidden"
        alt="Logo"
        width={100}
        height={100}
      />
      <Image
        src="assets/images/logo-white.svg"
        className="hidden dark:block"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Logo;
