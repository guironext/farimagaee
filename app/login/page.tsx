"use client";

import { useI18n } from "../components/LocaleProvider";

export default function LoginPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-md px-3 py-8 sm:px-4 sm:py-12">
      <h1 className="text-2xl font-bold text-white">{t("auth.login")}</h1>
      <form className="mt-6 flex flex-col gap-3">
        <input
          type="tel"
          placeholder={t("auth.mobile")}
          className="h-11 rounded-[2px] border border-white/20 bg-[#111] px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#e31c23]"
        />
        <input
          type="password"
          placeholder={t("auth.password")}
          className="h-11 rounded-[2px] border border-white/20 bg-[#111] px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#e31c23]"
        />
        <button
          type="button"
          className="h-11 bg-[#e31c23] text-sm font-bold text-white hover:bg-[#c7181e]"
        >
          {t("auth.login")}
        </button>
      </form>
    </div>
  );
}
