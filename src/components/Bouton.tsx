"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BoutonProps {
  title?: string;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
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
  const variantClasses = {
    primary:
      "bg-[#111622] text-[#f5f8fc] border-[#111622] hover:bg-[#1e3557] hover:border-[#1e3557]",
    secondary:
      "bg-transparent text-[#111622] border-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc]",
    light:
      "bg-[#f5f8fc] text-[#111622] border-[#f5f8fc] hover:bg-[#fff0a6] hover:border-[#fff0a6]",
  }[variant];

  const content = (
    <>
      <span className="font-sans text-[15px] font-semibold leading-none tracking-[-0.01em] whitespace-nowrap select-none">
        {title}
      </span>
      {showArrow && (
        <span className="relative flex items-center justify-end w-[18px] h-[18px] overflow-hidden shrink-0">
          <span className="flex items-center gap-[16px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-x-0 group-hover:translate-x-[34px]">
            <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0" />
            <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0" />
          </span>
        </span>
      )}
    </>
  );

  const baseClass = `group inline-flex items-center justify-center gap-[12px] px-[24px] py-[17px] rounded-full border-[1.5px] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer no-underline ${
    fullWidth ? "w-full" : "w-fit"
  } ${variantClasses} ${className}`;

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
    return (
      <Link href={href} className={baseClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {content}
    </button>
  );
}
