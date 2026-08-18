"use client";

import { useEffect, useRef, useState } from "react";
import { countries } from "../lib/i18n";
import { useI18n } from "./LocaleProvider";

export default function CountrySelect({
  compact = false,
  placement = "bottom",
}: {
  compact?: boolean;
  placement?: "bottom" | "top";
}) {
  const { country, locale, setCountry, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = countries.find((item) => item.code === country) ?? countries[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className={`flex items-center gap-1.5 rounded-[2px] text-left text-white hover:bg-white/10 ${
          compact ? "h-8 px-1.5" : "h-9 px-2"
        }`}
        aria-label={t("header.country")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden text-[11px] font-semibold uppercase tracking-wide sm:inline">
          {current.code}
        </span>
        <span className="text-[10px] text-[#00c853]">{open ? "▴" : "▾"}</span>
      </button>
      {open ? (
        <div
          className={`absolute left-0 z-30 w-[220px] overflow-hidden rounded-[2px] bg-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/15 ${
            placement === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          <p className="border-b border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            {t("header.country")}
          </p>
          {countries.map((item) => {
            const selected = item.code === country;
            return (
              <button
                key={item.code}
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] ${
                  selected
                    ? "bg-[#00c853] font-semibold text-black"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => {
                  setCountry(item.code);
                  setOpen(false);
                }}
              >
                <span aria-hidden>{item.flag}</span>
                <span>{item.name[locale]}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
