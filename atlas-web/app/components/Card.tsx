import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div";
  children: ReactNode;
};

export function Card({
  as: Tag = "section",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={`rounded-[1.5rem] bg-white p-5 shadow-[0_10px_30px_rgba(28,49,80,0.06)] sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
