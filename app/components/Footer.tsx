"use client";

import Image from "next/image";
import Link from "next/link";
import { countryByCode } from "../lib/i18n";
import CountrySelect from "./CountrySelect";
import { useI18n } from "./LocaleProvider";

const playLinks = [
  { href: "/", key: "nav.sports" },
  { href: "/live", key: "nav.live" },
  { href: "/games", key: "nav.games" },
  { href: "/virtuals", key: "nav.virtuals" },
  { href: "/jackpot", key: "nav.jackpot" },
  { href: "/instant", key: "nav.instant" },
  { href: "/fantasy", key: "nav.fantasy" },
  { href: "/livescore", key: "nav.livescore" },
  { href: "/results", key: "nav.results" },
] as const;

const companyLinks = [
  { href: "/about", key: "footer.about" },
  { href: "/privacy", key: "footer.privacy" },
  { href: "/terms", key: "footer.terms" },
  { href: "/responsible", key: "footer.responsible" },
] as const;

const helpLinks = [
  { href: "/faq", key: "footer.faq" },
  { href: "/promotions", key: "nav.promotions" },
  { href: "/loyalty", key: "nav.loyalty" },
  { href: "/join", key: "auth.register" },
  { href: "/login", key: "auth.login" },
] as const;

const payments = ["Orange Money", "Moov Money", "Wave", "MTN MoMo", "Visa", "Mastercard"];

export default function Footer() {
  const { t, country, locale } = useI18n();
  const current = countryByCode(country);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#111] text-white">
      <div className="h-[3px] bg-gradient-to-r from-[#00c853] to-[#e31c23]" />

      <div className="mx-auto w-full max-w-[1000px] px-3 pb-[88px] pt-8 sm:px-4 lg:px-0 lg:pb-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          <FooterColumn
            title={
              <span className="flex flex-col gap-2.5">
                <Link href="/" className="flex items-center gap-2 no-underline">
                  <Image
                    src="/logo.png"
                    alt="Fanma Game"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                  <span className="flex min-w-0 items-baseline gap-1">
                    <span className="text-[16px] font-black italic leading-none tracking-tight text-[#00c853]">
                      FARIMA
                    </span>
                    <span className="text-[16px] font-black italic leading-none tracking-tight text-[#e31c23]">
                      GAME
                    </span>
                  </span>
                </Link>
                <span className="flex items-center gap-2 font-normal">
                  <CountrySelect placement="top" />
                  <span className="text-[12px] text-white/70">{current.name[locale]}</span>
                </span>
              </span>
            }
          >
            {companyLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {t(item.key)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.howToPlay")}>
            {playLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {t(item.key)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.help")}>
            {helpLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {t(item.key)}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-[13px] font-bold text-white">{t("footer.getApp")}</p>
            <p className="mt-2 text-[12px] leading-5 text-white/55">{t("footer.appHint")}</p>
            <Link
              href="/app"
              className="mt-3 inline-flex items-center gap-2 bg-[#00c853] px-3 py-2 text-[12px] font-bold text-black no-underline hover:bg-[#00b34a]"
            >
              <Image src="/logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
              {t("nav.app")}
            </Link>

            <div className="mt-6 flex items-start gap-3">
              <span className="flex h-10 min-w-10 items-center justify-center bg-[#e31c23] px-1.5 text-[15px] font-black text-white">
                18+
              </span>
              <p className="text-[12px] leading-4 text-white/70">
                {t("footer.playResponsibly")}
                <br />
                {t("footer.disclaimer")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-[12px] font-semibold text-white/70">{t("footer.payments")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {payments.map((method) => (
              <span
                key={method}
                className="border border-white/15 bg-[#1c1c1c] px-2.5 py-1.5 text-[11px] font-semibold tracking-wide text-white/80"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5 text-[11px] leading-5 text-white/45">
          <p>
            © {year} Fanma Game. {t("footer.copyright")}
          </p>
          <p className="mt-1">{t("footer.license")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[13px] font-bold text-white">{title}</div>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[12px] text-[#00c853] no-underline hover:text-[#00e676]">
        {children}
      </Link>
    </li>
  );
}
