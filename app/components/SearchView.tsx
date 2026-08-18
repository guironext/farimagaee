"use client";

import { useI18n } from "./LocaleProvider";

export default function SearchView({ query }: { query: string }) {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-[1000px] px-3 py-5 sm:px-4 sm:py-8">
      <h1 className="text-2xl font-bold text-white">{t("pages.search.title")}</h1>
      <p className="mt-2 text-sm text-white/60">
        {query
          ? `${t("pages.search.resultsFor")} “${query}”`
          : t("pages.search.empty")}
      </p>
    </div>
  );
}
