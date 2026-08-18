"use client";

import type { SectionKey } from "../lib/i18n";
import { useI18n } from "./LocaleProvider";

export default function SectionPage({ page }: { page: Exclude<SectionKey, "search"> }) {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-[1000px] px-3 py-5 sm:px-4 sm:py-8">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {t(`pages.${page}.title`)}
      </h1>
      <p className="mt-2 text-sm text-white/60">{t(`pages.${page}.subtitle`)}</p>
    </div>
  );
}
