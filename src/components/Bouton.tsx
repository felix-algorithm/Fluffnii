"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  extractHomeSection,
  isModifiedClick,
  navigateToHomeSection,
} from "@/lib/sectionScroll";

export interface BoutonProps {
  title?: string;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  showArrow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export default function Bouton({
  title = "Contact",
  href,
  variant = "primary",
  showArrow = true,
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
}: BoutonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const variantClasses = {
    primary:
      "bg-ink text-cream border-ink hover:bg-espresso hover:border-espresso focus-visible:ring-ink focus-visible:ring-offset-cream dark:bg-cream dark:text-ink dark:border-cream dark:hover:bg-butter dark:hover:border-butter dark:hover:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night butter:bg-ink butter:text-cream butter:border-ink butter:hover:bg-espresso butter:hover:border-espresso butter:hover:text-cream butter:focus-visible:ring-ink butter:focus-visible:ring-offset-butter",
    secondary:
      "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream focus-visible:ring-ink focus-visible:ring-offset-cream dark:text-cream dark:border-cream dark:hover:bg-cream dark:hover:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night butter:border-ink butter:text-ink butter:hover:bg-ink butter:hover:text-cream butter:focus-visible:ring-ink butter:focus-visible:ring-offset-butter",
    light:
      "bg-cream text-ink border-cream hover:bg-butter hover:border-butter hover:text-ink focus-visible:ring-butter focus-visible:ring-offset-ink",
  }[variant];

  const content = (
    <>
      <span className="font-sans text-[15px] font-semibold leading-none tracking-[-0.01em] whitespace-nowrap select-none">
        {title}
      </span>
      {showArrow && (
        <span
          aria-hidden="true"
          className="relative flex items-center justify-end w-[18px] h-[18px] overflow-hidden shrink-0"
        >
          <span className="flex items-center gap-4 transition-transform duration-500 ease-studio translate-x-0 group-hover:translate-x-[34px]">
            <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0" />
            <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0" />
          </span>
        </span>
      )}
    </>
  );

  const baseClass = cn(
    "group inline-flex items-center justify-center gap-3 px-6 py-[17px] rounded-full border-[1.5px] transition-colors duration-500 ease-studio cursor-pointer no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    fullWidth ? "w-full" : "w-fit",
    variantClasses,
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={baseClass}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    const sectionId = extractHomeSection(href);
    if (sectionId) {
      return (
        <Link
          href="/"
          className={baseClass}
          onClick={(e) => {
            onClick?.(e);
            if (!e.defaultPrevented && !isModifiedClick(e)) {
              e.preventDefault();
              navigateToHomeSection(sectionId, pathname, router);
            }
          }}
        >
          {content}
        </Link>
      );
    }
    return (
      <Link href={href} className={baseClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={
        onClick
          ? (e) => onClick(e as unknown as React.MouseEvent<HTMLAnchorElement>)
          : undefined
      }
      className={baseClass}
    >
      {content}
    </button>
  );
}
