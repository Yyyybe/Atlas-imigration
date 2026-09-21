import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-[var(--atlas-navy)] text-white hover:bg-[var(--atlas-navy-deep)]",
  secondary:
    "border border-[var(--atlas-line)] bg-white text-[var(--atlas-navy)] hover:bg-[var(--atlas-mist)]",
  ghost: "text-[var(--atlas-navy)] hover:bg-[var(--atlas-mist)]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atlas-navy)] ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
