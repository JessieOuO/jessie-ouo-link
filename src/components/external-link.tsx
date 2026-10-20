import type { ReactNode } from "react";

type ExternalLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>;

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} className={className} rel="me noreferrer">
      {children}
    </a>
  );
}
