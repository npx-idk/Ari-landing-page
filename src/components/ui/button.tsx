import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  colorClass?: string; // Changed from color to colorClass
  className?: string;
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  colorClass = "bg-indigo-500 hover:bg-indigo-600", // Default indigo color classes
  className,
  children,
  href,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ease-in-out";

  const variantStyles = {
    primary: `
      transform hover:scale-105
      text-white
      ${colorClass}
      hover:shadow-lg
      dark:shadow-indigo-500/20
    `,
    secondary: `
      border-2 border-gray-200 dark:border-gray-700
      text-gray-700 dark:text-gray-200
      hover:bg-gray-100 dark:hover:bg-white/10
      bg-transparent
    `,
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
