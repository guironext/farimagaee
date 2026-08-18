"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CountrySelect from "./CountrySelect";
import { useI18n } from "./LocaleProvider";

const mainNav = [
  { href: "/", key: "nav.sports" },
  { href: "/games", key: "nav.games" },
  { href: "/live", key: "nav.live" },
  { href: "/fantasy", key: "nav.fantasy" },
  { href: "/instant", key: "nav.instant" },
  { href: "/virtuals", key: "nav.virtuals" },
  { href: "/jackpot", key: "nav.jackpot" },
  { href: "/livescore", key: "nav.livescore" },
  { href: "/results", key: "nav.results" },
  { href: "/promotions", key: "nav.promotions" },
  { href: "/loyalty", key: "nav.loyalty" },
  { href: "/app", key: "nav.app", hot: true },
] as const;

const sports = [
  { href: "/?sport=football", key: "sports.football" },
  { href: "/?sport=basketball", key: "sports.basketball" },
  { href: "/?sport=tennis", key: "sports.tennis" },
  { href: "/?sport=ice-hockey", key: "sports.iceHockey" },
  { href: "/?sport=volleyball", key: "sports.volleyball" },
  { href: "/?sport=table-tennis", key: "sports.tableTennis" },
  { href: "/?sport=cricket", key: "sports.cricket" },
  { href: "/?sport=boxing", key: "sports.boxing" },
  { href: "/?sport=rugby", key: "sports.rugby" },
  { href: "/?sport=esports", key: "sports.esports" },
] as const;

const moreSports = [
  { href: "/?sport=handball", key: "sports.handball" },
  { href: "/?sport=snooker", key: "sports.snooker" },
  { href: "/?sport=futsal", key: "sports.futsal" },
  { href: "/?sport=baseball", key: "sports.baseball" },
  { href: "/?sport=mma", key: "sports.mma" },
  { href: "/?sport=golf", key: "sports.golf" },
] as const;

type Translate = (key: string) => string;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const topBarRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const updateMenuTop = () => {
      const bottom = topBarRef.current?.getBoundingClientRect().bottom ?? 0;
      setMenuTop((current) => (current === bottom ? current : bottom));
    };
    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    return () => window.removeEventListener("resize", updateMenuTop);
  }, [menuOpen]);

  const sportsNav = (
    <nav className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]" aria-label={t("home.sports")}>
      <div className="relative mx-auto flex h-[41px] w-full max-w-[1000px] items-stretch overflow-x-auto overflow-y-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sports.map((sport) => (
          <Link
            key={sport.key}
            href={sport.href}
            className="flex shrink-0 items-center whitespace-nowrap px-[13px] pt-[11px] pb-[7px] text-[14px] leading-[19px] text-black no-underline hover:border-b-[3px] hover:border-[#e31c23]"
          >
            {t(sport.key)}
          </Link>
        ))}
        <div className="flex md:hidden">
          {moreSports.map((sport) => (
            <Link
              key={sport.key}
              href={sport.href}
              className="flex shrink-0 items-center whitespace-nowrap px-[13px] pt-[11px] pb-[7px] text-[14px] leading-[19px] text-black no-underline hover:border-b-[3px] hover:border-[#e31c23]"
            >
              {t(sport.key)}
            </Link>
          ))}
        </div>
        <div className="relative hidden md:block">
          <button
            type="button"
            className="flex h-full items-center gap-1 px-[13px] pt-[11px] pb-[7px] text-[14px] leading-[19px] text-black"
            onClick={() => setMoreOpen((open) => !open)}
          >
            {t("sports.more")}
            <span className="text-[#00c853]">{moreOpen ? "▴" : "▾"}</span>
          </button>
          {moreOpen ? (
            <div className="absolute left-0 top-[41px] z-20 w-[160px] bg-white shadow-[0_5px_5px_rgba(0,0,0,0.2)]">
              {moreSports.map((sport) => (
                <Link
                  key={sport.key}
                  href={sport.href}
                  className="block px-[13px] py-2.5 text-[14px] text-black hover:bg-[#00c853] hover:text-white"
                  onClick={() => setMoreOpen(false)}
                >
                  {t(sport.key)}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );

  return (
    <header className="z-50 [overflow-anchor:none]">
      <div className="sticky top-0 z-50 lg:hidden">
        <div className="bg-black text-white">
          <div className="mx-auto w-full max-w-[1000px] px-3">
            <TopBar
              ref={topBarRef}
              t={t}
              menuOpen={menuOpen}
              onMenuToggle={() => {
                setMenuTop(topBarRef.current?.getBoundingClientRect().bottom ?? 0);
                setMenuOpen((open) => !open);
              }}
            />
            <nav
              className="-mx-3 flex min-h-[46px] items-stretch overflow-x-auto overscroll-x-contain px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Main"
            >
              <MainNavLinks pathname={pathname} t={t} variant="mobile" />
              <ResponsiblePlayBadge t={t} compact />
            </nav>
          </div>
        </div>
        <div className="h-[3px] bg-gradient-to-r from-[#00c853] to-[#e31c23]" />
        {sportsNav}
      </div>

      <div className="hidden lg:block">
        <div className="bg-black text-white">
          <div className="mx-auto w-full max-w-[1000px]">
            <div ref={sentinelRef} className="h-px w-px" aria-hidden />
            <TopBar t={t} desktop />
          </div>
        </div>
        <div className="sticky top-0 z-50">
          <div className="bg-black text-white">
            <div className="relative mx-auto w-full max-w-[1000px]">
              <nav
                id="topHeader"
                className={`flex h-[50px] items-stretch ${compact ? "pr-[190px]" : "pr-2.5"}`}
                aria-label="Main"
              >
                {compact ? (
                  <>
                    <Link
                      href="/"
                      className="mr-1 flex w-[50px] shrink-0 items-center justify-center"
                    >
                      <Image
                        src="/logo.png"
                        alt="Fanma Game"
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] object-contain"
                      />
                    </Link>
                    <div className="mr-1 flex items-center">
                      <CountrySelect compact />
                    </div>
                  </>
                ) : null}
                <MainNavLinks pathname={pathname} t={t} variant="desktop" />
                <ResponsiblePlayBadge t={t} />
              </nav>
              {compact ? (
                <div className="absolute right-0 top-2 flex items-center">
                  <Link
                    href="/login"
                    className="inline-flex h-8 min-w-[65px] items-center justify-center rounded-[2px] bg-[#e31c23] px-2 text-[12px] font-semibold text-white hover:bg-[#c7181e]"
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    href="/join"
                    className="ml-2.5 inline-flex h-8 min-w-[65px] items-center justify-center rounded-[2px] bg-[#00c853] px-2 text-[12px] font-semibold text-white hover:bg-[#00b34a]"
                  >
                    {t("auth.register")}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <div className="h-[3px] bg-gradient-to-r from-[#00c853] to-[#e31c23]" />
          {sportsNav}
        </div>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{ top: menuTop }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label={t("header.closeMenu")}
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(320px,86vw)] flex-col overflow-y-auto bg-black">
            <div className="border-b border-white/10 px-3 py-3">
              <CountrySelect />
            </div>
            <nav className="flex flex-col" aria-label="Mobile">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between border-b border-white/10 px-4 py-3.5 text-[14px] font-semibold ${
                      active ? "bg-[#e31c23] text-white" : "text-[#00c853]"
                    }`}
                  >
                    {t(item.key)}
                    {"hot" in item && item.hot ? (
                      <span className="rounded-[1px] bg-[#00c853] px-1.5 text-[10px] font-black uppercase text-black">
                        {t("nav.hot")}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
            <nav className="border-t border-white/10" aria-label={t("home.sports")}>
              {[...sports, ...moreSports].map((sport) => (
                <Link
                  key={sport.key}
                  href={sport.href}
                  className="block border-b border-white/10 px-4 py-3 text-[13px] text-white/80"
                >
                  {t(sport.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <ResponsiblePlayBadge t={t} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function TopBar({
  ref,
  t,
  desktop = false,
  menuOpen = false,
  onMenuToggle,
}: {
  ref?: React.Ref<HTMLDivElement>;
  t: Translate;
  desktop?: boolean;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}) {
  return (
    <div
      ref={ref}
      className={`flex items-center justify-between gap-2 sm:gap-3 ${
        desktop ? "py-5" : "py-2.5"
      }`}
    >
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        {desktop ? null : (
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#00c853]"
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
            aria-expanded={menuOpen}
            onClick={onMenuToggle}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        )}

        <Link href="/" className="flex min-w-0 items-center gap-1.5 no-underline sm:gap-2">
          <Image
            src="/logo.png"
            alt="Fanma Game"
            width={144}
            height={144}
            priority
            className={`object-contain ${
              desktop ? "h-[72px] w-[72px]" : "h-10 w-10 sm:h-14 sm:w-14"
            }`}
          />
          <span className="flex min-w-0 items-baseline gap-1">
            <span
              className={`truncate font-black italic leading-none tracking-tight text-[#00c853] ${
                desktop ? "text-[28px]" : "text-[16px] sm:text-[22px]"
              }`}
            >
              FARIMA
            </span>
            <span
              className={`truncate p-1 font-black italic leading-none tracking-tight text-[#e31c23] ${
                desktop ? "text-[28px]" : "text-[16px] sm:text-[22px]"
              }`}
            >
              GAME
            </span>
          </span>
        </Link>
        {desktop ? (
          <div>
            <CountrySelect />
          </div>
        ) : null}
      </div>

      {desktop ? (
        <div className="flex items-start gap-2">
          <form className="flex flex-col items-end gap-1.5" action="/login">
            <div className="flex items-center">
              <label className="mr-[5px] flex h-8 overflow-hidden rounded-[2px] bg-[#1a1a1a] ring-1 ring-white/20">
                <span className="flex items-center pl-[15px] pr-1 text-[12px] text-[#00c853]">
                  +
                </span>
                <input
                  name="phone"
                  type="tel"
                  placeholder={t("auth.mobile")}
                  className="h-8 w-[148px] bg-[#1a1a1a] px-2 text-[12px] text-[#00c853] outline-none placeholder:text-[#00c853]/50"
                />
              </label>
              <div className="flex h-8 overflow-hidden rounded-[2px] ring-1 ring-white/20">
                <input
                  name="password"
                  type="password"
                  placeholder={t("auth.password")}
                  className="h-8 w-[150px] bg-[#1a1a1a] px-2.5 text-[12px] text-[#00c853] outline-none placeholder:text-[#00c853]/50"
                />
                <button
                  type="submit"
                  className="h-8 min-w-[65px] bg-[#e31c23] px-2 text-[12px] font-semibold text-white hover:bg-[#c7181e]"
                >
                  {t("auth.login")}
                </button>
              </div>
              <Link
                href="/join"
                className="ml-2.5 inline-flex h-8 min-w-[65px] items-center justify-center rounded-[2px] bg-[#00c853] px-2 text-[12px] font-semibold text-white hover:bg-[#00b34a]"
              >
                {t("auth.register")}
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[12px] leading-4 text-[#00c853]">
              <label className="flex cursor-pointer items-center gap-1">
                <input type="checkbox" className="accent-[#00c853]" />
                {t("auth.keepSignedIn")}
              </label>
              <Link href="/login" className="hover:text-[#00e676]">
                {t("auth.forgotPassword")}
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/login"
            className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-[2px] bg-[#e31c23] px-2 text-[11px] font-semibold text-white sm:min-w-[65px] sm:text-[12px]"
          >
            {t("auth.login")}
          </Link>
          <Link
            href="/join"
            className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-[2px] bg-[#00c853] px-2 text-[11px] font-semibold text-white sm:min-w-[65px] sm:text-[12px]"
          >
            {t("auth.register")}
          </Link>
        </div>
      )}
    </div>
  );
}

function MainNavLinks({
  pathname,
  t,
  variant,
}: {
  pathname: string;
  t: Translate;
  variant: "desktop" | "mobile";
}) {
  const mobile = variant === "mobile";

  return (
    <>
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex origin-bottom-left items-center justify-center font-bold leading-none no-underline ${
              mobile
                ? "h-[46px] shrink-0 px-3 text-[13px]"
                : "flex-1 px-1 text-[14px]"
            } ${
              active
                ? "skew-x-[-6deg] bg-white text-black"
                : "text-[#00c853] hover:skew-x-[-6deg] hover:bg-[#e31c23] hover:text-white"
            }`}
          >
            <span
              className={`inline-block text-center ${
                mobile ? "whitespace-nowrap" : "max-w-[80px]"
              } ${active ? "skew-x-[6deg]" : "group-hover:skew-x-[6deg]"}`}
            >
              {t(item.key)}
            </span>
            {"hot" in item && item.hot ? (
              <span className="absolute right-1 top-0 rounded-[1px] bg-[#00c853] px-1 text-[9px] font-black uppercase leading-4 text-black">
                {t("nav.hot")}
              </span>
            ) : null}
          </Link>
        );
      })}
    </>
  );
}

function ResponsiblePlayBadge({
  t,
  compact = false,
}: {
  t: Translate;
  compact?: boolean;
}) {
  return (
    <div className={`ml-2 flex shrink-0 items-center ${compact ? "w-[68px]" : "w-[80px]"}`}>
      <div
        className={`flex w-full origin-center flex-col justify-center border-l-2 border-red-600 bg-red-600 pl-1.5 skew-x-[-18deg] ${
          compact ? "h-[36px]" : "h-[42px]"
        }`}
      >
        <span
          className={`font-bold leading-none text-white skew-x-[18deg] ${
            compact ? "text-[13px]" : "text-[16px]"
          }`}
        >
          18+
        </span>
        <span
          className={`mt-0.5 font-medium leading-none text-white skew-x-[18deg] ${
            compact ? "text-[8px]" : "text-[9px]"
          }`}
        >
          {t("header.playResponsiblyLine1")}
          <br />
          {t("header.playResponsiblyLine2")}
        </span>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
