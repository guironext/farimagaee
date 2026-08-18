"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  banners,
  cashoutBets,
  HERO_NOW,
  marketOdds,
  matches as allMatches,
  parseSport,
  sportsCatalog,
  type CashoutBet,
  type Market,
  type Match,
  type SportId,
} from "../lib/hero-data";
import type { CountryCode, Locale } from "../lib/i18n";
import { countryByCode } from "../lib/i18n";
import { useI18n } from "./LocaleProvider";

type Tab = "popular" | "today" | "upcoming" | "live";

type SlipPick = {
  matchId: string;
  market: Market;
  odds: number;
  home: string;
  away: string;
  league: string;
};

const bannerTone: Record<(typeof banners)[number]["tone"], string> = {
  green: "from-[#052814] via-[#0b7a38] to-[#00c853]",
  red: "from-[#3b0709] via-[#a31419] to-[#e31c23]",
  dark: "from-black via-[#141414] to-[#1f1f1f]",
  gold: "from-[#2c2108] via-[#8a6b12] to-[#d4a017]",
};

function formatOdds(value: number) {
  return value.toFixed(2);
}

function isSameDay(iso: string, now: Date) {
  const date = new Date(iso);
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatKickoff(iso: string, locale: Locale) {
  const date = new Date(iso);
  const time = date.toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isSameDay(iso, HERO_NOW)) return time;
  const day = date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return `${day} ${time}`;
}

function formatMoney(amount: number, country: CountryCode, locale: Locale) {
  const currency = country === "ng" ? "NGN" : country === "gh" ? "GHS" : "XOF";
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function clockLabel(match: Match) {
  if (!match.live) return null;
  if (match.sport === "football") return `${match.live.minute}'`;
  if (match.sport === "basketball") return `Q${Math.min(4, Math.max(1, Math.ceil(match.live.minute / 12)))}`;
  if (match.sport === "tennis") return "Set";
  return null;
}

export default function Hero({ sport }: { sport?: string | string[] }) {
  const { t, locale, country } = useI18n();
  const router = useRouter();
  const activeSport = parseSport(sport);
  const [tab, setTab] = useState<Tab>("popular");
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const [picks, setPicks] = useState<SlipPick[]>([]);
  const [stake, setStake] = useState("1000");
  const [placed, setPlaced] = useState(false);
  const [moreSports, setMoreSports] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % banners.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setTab("popular");
    setQuery("");
  }, [activeSport]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMatches.filter((match) => {
      if (match.sport !== activeSport) return false;
      if (tab === "live" && !match.live) return false;
      if (tab === "upcoming" && (match.live || new Date(match.kickoff) <= HERO_NOW)) return false;
      if (tab === "today" && !isSameDay(match.kickoff, HERO_NOW) && !match.live) return false;
      if (!q) return true;
      return (
        match.home.name.toLowerCase().includes(q) ||
        match.away.name.toLowerCase().includes(q) ||
        match.league.toLowerCase().includes(q)
      );
    });
  }, [activeSport, tab, query]);

  const highlights = filtered.filter((match) => match.featured || match.boosted).slice(0, 3);
  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const match of filtered) {
      const list = map.get(match.league) ?? [];
      list.push(match);
      map.set(match.league, list);
    }
    return [...map.entries()];
  }, [filtered]);

  const selected = (matchId: string, market: Market) =>
    picks.some((pick) => pick.matchId === matchId && pick.market === market);

  const togglePick = (match: Match, market: Market) => {
    const odds = marketOdds(match, market);
    if (odds == null) return;
    setPlaced(false);
    setPicks((current) => {
      const same = current.find((pick) => pick.matchId === match.id && pick.market === market);
      if (same) return current.filter((pick) => pick !== same);
      return [
        ...current.filter((pick) => pick.matchId !== match.id),
        {
          matchId: match.id,
          market,
          odds,
          home: match.home.name,
          away: match.away.name,
          league: match.league,
        },
      ];
    });
  };

  const totalOdds = picks.reduce((product, pick) => product * pick.odds, picks.length ? 1 : 0);
  const stakeValue = Number(stake) || 0;
  const potential = totalOdds * stakeValue;
  const visibleSports = moreSports ? sportsCatalog : sportsCatalog.slice(0, 10);

  const setSport = (id: SportId) => {
    router.push(id === "football" ? "/" : `/?sport=${id}`);
  };

  const tabs: { id: Tab; key: string }[] = [
    { id: "popular", key: "hero.popular" },
    { id: "today", key: "hero.todaysFootball" },
    { id: "upcoming", key: "hero.upcoming" },
    { id: "live", key: "hero.live" },
  ];

  return (
    <div className="min-h-full bg-[#e8e8e8] text-black">
      <div className="mx-auto flex w-full max-w-[1000px] items-start gap-2 px-2 py-2 sm:px-3 lg:px-0">
        <aside className="sticky top-[94px] hidden w-[168px] shrink-0 lg:block">
          <div className="overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <label className="flex items-center gap-2 border-b border-black/10 px-2.5 py-2">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("hero.search")}
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-black/40"
              />
            </label>
            <nav aria-label={t("home.sports")}>
              {visibleSports.map((item) => {
                const active = item.id === activeSport;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSport(item.id)}
                    className={`flex w-full items-center justify-between px-2.5 py-2 text-left text-[13px] ${
                      active
                        ? "bg-[#00c853] font-semibold text-white"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <span className={active ? "text-white/80" : "text-black/45"}>{item.count}</span>
                  </button>
                );
              })}
            </nav>
            <button
              type="button"
              className="flex w-full items-center justify-between border-t border-black/10 px-2.5 py-2.5 text-[13px] text-black hover:bg-black/5"
              onClick={() => setMoreSports((open) => !open)}
            >
              {t("hero.moreSports")}
              <span className="text-[#00c853]">{moreSports ? "▴" : "▾"}</span>
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <section className="relative overflow-hidden bg-black shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {banners.map((banner) => (
                <Link
                  key={banner.id}
                  href={banner.href}
                  className={`relative flex min-h-[220px] w-full shrink-0 flex-col justify-between bg-gradient-to-r p-5 no-underline sm:min-h-[280px] sm:p-7 ${bannerTone[banner.tone]}`}
                >
                  <div className="pointer-events-none absolute -right-8 top-0 h-full w-[220px] opacity-20">
                    <Image
                      src="/logo.png"
                      alt=""
                      fill
                      sizes="220px"
                      className="object-contain object-right"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      {t(banner.kickerKey)}
                    </p>
                    <h2 className="mt-1 max-w-[28ch] text-[22px] font-black italic leading-none tracking-tight text-white sm:text-[28px]">
                      {t(banner.titleKey)}
                    </h2>
                    <p className="mt-2 max-w-[42ch] text-[12px] text-white/80 sm:text-[13px]">
                      {t(banner.subtitleKey)}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex h-8 w-fit items-center bg-white px-3 text-[12px] font-bold text-black">
                    {t(banner.ctaKey)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="absolute bottom-2.5 right-3 flex gap-1.5">
              {banners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={t(banner.titleKey)}
                  onClick={() => setSlide(index)}
                  className={`h-1.5 rounded-full ${
                    slide === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </section>

          <label className="mt-2 flex items-center gap-2 bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)] lg:hidden">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("hero.search")}
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/40"
            />
          </label>

          {highlights.length > 0 && tab === "popular" && !query ? (
            <section className="mt-2">
              <div className="mb-1.5 flex items-center justify-between px-0.5">
                <h3 className="text-[13px] font-bold text-black/70">{t("hero.highlights")}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {highlights.map((match) => (
                  <article key={match.id} className="bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] font-semibold text-black/50">{match.league}</p>
                      {match.boosted ? (
                        <span className="rounded-[1px] bg-[#00c853] px-1.5 text-[9px] font-black uppercase text-black">
                          {t("hero.boost")}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <TeamLine team={match.home} score={match.live?.home} />
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <TeamLine team={match.away} score={match.live?.away} />
                    </div>
                    <div className="mt-2.5 flex gap-1">
                      <OddsButton
                        label={t("hero.home")}
                        odds={match.odds.home}
                        active={selected(match.id, "home")}
                        onClick={() => togglePick(match, "home")}
                      />
                      {match.odds.draw != null ? (
                        <OddsButton
                          label={t("hero.draw")}
                          odds={match.odds.draw}
                          active={selected(match.id, "draw")}
                          onClick={() => togglePick(match, "draw")}
                        />
                      ) : null}
                      <OddsButton
                        label={t("hero.away")}
                        odds={match.odds.away}
                        active={selected(match.id, "away")}
                        onClick={() => togglePick(match, "away")}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-2 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between border-b border-black/10">
              <div className="-mb-px flex min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`shrink-0 border-b-2 px-3 py-2.5 text-[13px] font-semibold ${
                      tab === item.id
                        ? "border-[#e31c23] text-[#e31c23]"
                        : "border-transparent text-black/60 hover:text-black"
                    }`}
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>
              <div className="hidden shrink-0 items-center gap-3 px-3 text-[12px] text-black/45 sm:flex">
                <span>{t("hero.print")}</span>
                <span>{t("hero.refresh")}</span>
              </div>
            </div>

            {grouped.length === 0 ? (
              <p className="px-4 py-10 text-center text-[13px] text-black/50">{t("hero.noEvents")}</p>
            ) : (
              grouped.map(([league, leagueMatches]) => (
                <div key={league}>
                  <div className="flex items-center justify-between bg-[#f4f4f4] px-3 py-1.5">
                    <h4 className="text-[12px] font-bold text-black/70">{league}</h4>
                    <span className="text-[11px] text-black/40">{t("hero.markets")}</span>
                  </div>
                  {leagueMatches.map((match) => (
                    <MatchRow
                      key={match.id}
                      match={match}
                      locale={locale}
                      selected={selected}
                      onToggle={togglePick}
                      t={t}
                    />
                  ))}
                </div>
              ))
            )}
          </section>
        </div>

        <aside className="sticky top-[94px] hidden w-[248px] shrink-0 lg:block">
          <div className="space-y-2">
            <InstantRegistration />
            <BetSlip
              picks={picks}
              stake={stake}
              setStake={setStake}
              totalOdds={totalOdds}
              potential={potential}
              placed={placed}
              country={country}
              locale={locale}
              t={t}
              onRemove={(matchId) => setPicks((current) => current.filter((pick) => pick.matchId !== matchId))}
              onPlace={() => {
                if (!picks.length || !stakeValue) return;
                setPlaced(true);
                setPicks([]);
              }}
            />
            <CashOutCard country={country} locale={locale} t={t} />
          </div>
        </aside>
      </div>

      <div className="lg:hidden">
        <div className={picks.length ? "h-[220px]" : "h-[52px]"} />
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          <BetSlip
            compact
            picks={picks}
            stake={stake}
            setStake={setStake}
            totalOdds={totalOdds}
            potential={potential}
            placed={placed}
            country={country}
            locale={locale}
            t={t}
            onRemove={(matchId) => setPicks((current) => current.filter((pick) => pick.matchId !== matchId))}
            onPlace={() => {
              if (!picks.length || !stakeValue) return;
              setPlaced(true);
              setPicks([]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MatchRow({
  match,
  locale,
  selected,
  onToggle,
  t,
}: {
  match: Match;
  locale: Locale;
  selected: (matchId: string, market: Market) => boolean;
  onToggle: (match: Match, market: Market) => void;
  t: (key: string) => string;
}) {
  const live = Boolean(match.live);
  const clock = clockLabel(match);

  return (
    <article className="flex items-stretch gap-2 border-b border-black/10 px-2 py-2 sm:px-3">
      <div className="flex w-[58px] shrink-0 flex-col justify-center sm:w-[72px]">
        {live ? (
          <>
            <span className="flex items-center gap-1 text-[11px] font-black text-[#e31c23]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e31c23] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e31c23]" />
              </span>
              {t("hero.liveNow")}
            </span>
            {clock ? <span className="text-[11px] font-semibold text-black/50">{clock}</span> : null}
          </>
        ) : (
          <span className="text-[11px] leading-tight text-black/50">{formatKickoff(match.kickoff, locale)}</span>
        )}
        {match.boosted ? (
          <span className="mt-1 w-fit rounded-[1px] bg-[#00c853] px-1 text-[9px] font-black uppercase text-black">
            {t("hero.boost")}
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-medium text-black">{match.home.name}</span>
          {live ? <span className="text-[13px] font-bold text-black">{match.live?.home}</span> : null}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-medium text-black">{match.away.name}</span>
          {live ? <span className="text-[13px] font-bold text-black">{match.live?.away}</span> : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <OddsButton
          label={t("hero.home")}
          odds={match.odds.home}
          active={selected(match.id, "home")}
          onClick={() => onToggle(match, "home")}
        />
        {match.odds.draw != null ? (
          <OddsButton
            label={t("hero.draw")}
            odds={match.odds.draw}
            active={selected(match.id, "draw")}
            onClick={() => onToggle(match, "draw")}
          />
        ) : null}
        <OddsButton
          label={t("hero.away")}
          odds={match.odds.away}
          active={selected(match.id, "away")}
          onClick={() => onToggle(match, "away")}
        />
        <span className="hidden w-8 text-right text-[11px] text-[#00c853] sm:inline">+{match.marketsCount}</span>
      </div>
    </article>
  );
}

function OddsButton({
  label,
  odds,
  active,
  onClick,
}: {
  label: string;
  odds: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 min-w-[52px] flex-col items-center justify-center px-1.5 leading-none sm:min-w-[58px] ${
        active ? "bg-[#e31c23] text-white" : "bg-[#f3f3f3] hover:bg-[#ececec]"
      }`}
    >
      <span className={`text-[9px] ${active ? "text-white/80" : "text-black/40"}`}>{label}</span>
      <span className={`text-[13px] font-bold ${active ? "text-white" : "text-[#00a651]"}`}>
        {formatOdds(odds)}
      </span>
    </button>
  );
}

function TeamLine({ team, score }: { team: Match["home"]; score?: number }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white"
        style={{ background: team.color === "#ffffff" ? "#1a1a1a" : team.color }}
      >
        {team.short.slice(0, 3)}
      </span>
      <span className="truncate text-[13px] font-semibold">{team.name}</span>
      {score != null ? <span className="ml-auto text-[13px] font-bold">{score}</span> : null}
    </div>
  );
}

function InstantRegistration() {
  const { t, country } = useI18n();
  const dial = countryByCode(country).dial;

  return (
    <div className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="px-3 pt-3">
        <h3 className="text-[15px] font-bold leading-tight text-[#00c853]">{t("hero.instantTitle")}</h3>
        <p className="mt-1 text-[12px] font-semibold leading-snug text-black">
          {t("hero.instantSubtitle")}
        </p>
      </div>
      <form action="/join" className="px-3 py-3">
        <label className="flex h-8 overflow-hidden ring-1 ring-black/15">
          <span className="flex shrink-0 items-center bg-[#f3f3f3] px-2 text-[12px] font-semibold text-black/60">
            +{dial}
          </span>
          <input
            name="phone"
            type="tel"
            placeholder={t("auth.mobile")}
            className="h-8 min-w-0 flex-1 bg-white px-2 text-[12px] text-black outline-none placeholder:text-black/35"
          />
        </label>
        <input
          name="password"
          type="password"
          placeholder={t("auth.createPassword")}
          className="mt-2 h-8 w-full bg-white px-2 text-[12px] text-black outline-none ring-1 ring-black/15 placeholder:text-black/35"
        />
        <button
          type="submit"
          className="mt-2 h-8 w-full bg-[#00c853] text-[12px] font-bold text-white hover:bg-[#00b34a]"
        >
          {t("auth.register")}
        </button>
      </form>
    </div>
  );
}

function CashOutCard({
  country,
  locale,
  t,
}: {
  country: CountryCode;
  locale: Locale;
  t: (key: string) => string;
}) {
  const [openBets, setOpenBets] = useState(cashoutBets);
  const [cashedId, setCashedId] = useState<string | null>(null);

  const pickLabel = (bet: CashoutBet) => {
    if (bet.market === "draw") return t("hero.drawLabel");
    return bet.market === "home" ? bet.home : bet.away;
  };

  return (
    <div className="bg-gradient-to-br from-[#00c853] via-[#00c853] to-[#e31c23] p-[4px] shadow-[0_8px_18px_rgba(0,200,83,0.14)]">
      <div className="bg-white">
      <div className="flex items-center justify-between border-b-[3px] border-[#00c853]/30 px-3 py-2">
        <h3 className="text-[14px] font-bold text-black/55">{t("hero.betslip")}</h3>
        <span className="relative pb-0.5 text-[12px] font-bold text-[#00c853] after:absolute after:inset-x-0 after:-bottom-2 after:h-[3px] after:bg-[#00c853]">
          {t("hero.cashout")}
        </span>
      </div>

      {cashedId ? (
        <p className="px-3 py-3 text-[12px] font-semibold text-[#00a651]">{t("hero.cashedOut")}</p>
      ) : null}

      {openBets.length === 0 ? (
        <p className="px-3 py-6 text-center text-[12px] text-black/50">{t("hero.cashoutEmpty")}</p>
      ) : (
        <ul>
          {openBets.map((bet) => (
            <li key={bet.id} className="border-b border-black/10 px-3 py-2.5 last:border-b-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[11px] text-black/45">{bet.league[locale]}</p>
                <span className="flex items-center gap-1 text-[10px] font-black text-[#e31c23]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e31c23] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e31c23]" />
                  </span>
                  {t("hero.liveNow")} {bet.live.minute}'
                </span>
              </div>
              <p className="mt-0.5 text-[12px] text-black/70">
                {bet.home} {bet.live.home} - {bet.live.away} {bet.away}
              </p>
              <p className="text-[13px] font-bold">
                {pickLabel(bet)}{" "}
                <span className="font-bold text-[#00a651]">{bet.odds.toFixed(2)}</span>
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px] text-black/50">
                <span>
                  {t("hero.cashoutStake")}: {formatMoney(bet.stake, country, locale)}
                </span>
              </div>
              <button
                type="button"
                className="mt-2 h-8 w-full bg-[#00c853] text-[12px] font-bold text-white hover:bg-[#00b34a]"
                onClick={() => {
                  setOpenBets((current) => current.filter((item) => item.id !== bet.id));
                  setCashedId(bet.id);
                }}
              >
                {t("hero.cashoutAction")} {formatMoney(bet.cashout, country, locale)}
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

function BetSlip({
  picks,
  stake,
  setStake,
  totalOdds,
  potential,
  placed,
  country,
  locale,
  t,
  onRemove,
  onPlace,
  compact = false,
}: {
  picks: SlipPick[];
  stake: string;
  setStake: (value: string) => void;
  totalOdds: number;
  potential: number;
  placed: boolean;
  country: CountryCode;
  locale: Locale;
  t: (key: string) => string;
  onRemove: (matchId: string) => void;
  onPlace: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`bg-white ${compact ? "" : "shadow-[0_1px_2px_rgba(0,0,0,0.08)]"}`}>
      <div className="flex items-center justify-between border-b border-black/10 px-3 py-2">
        <h3 className="text-[14px] font-bold">{t("hero.betslip")}</h3>
        <span className="text-[11px] font-semibold text-black/45">
          {picks.length <= 1 ? t("hero.singles") : t("hero.multiple")}
          {picks.length ? ` · ${picks.length}` : ""}
        </span>
      </div>

      {placed ? (
        <p className="px-3 py-4 text-[13px] font-semibold text-[#00a651]">{t("hero.placed")}</p>
      ) : null}

      {picks.length === 0 && !placed ? (
        compact ? null : (
          <div className="px-3 py-8 text-center">
            <p className="text-[13px] font-semibold">{t("hero.emptyBetslip")}</p>
            <p className="mt-1 text-[12px] text-black/45">{t("hero.emptyBetslipHint")}</p>
          </div>
        )
      ) : null}

      {picks.length > 0 ? (
        <>
          <ul className={compact ? "max-h-[28vh] overflow-y-auto" : ""}>
            {picks.map((pick) => (
              <li key={pick.matchId} className="border-b border-black/10 px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] text-black/45">{pick.league}</p>
                    <p className="truncate text-[12px] text-black/70">
                      {pick.home} vs {pick.away}
                    </p>
                    <p className="text-[13px] font-bold">
                      {pick.market === "draw"
                        ? t("hero.drawLabel")
                        : pick.market === "home"
                          ? pick.home
                          : pick.away}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#00a651]">{formatOdds(pick.odds)}</span>
                    <button
                      type="button"
                      className="text-[11px] text-black/40 hover:text-[#e31c23]"
                      aria-label={t("hero.remove")}
                      onClick={() => onRemove(pick.matchId)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-2 px-3 py-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-black/50">{t("hero.totalOdds")}</span>
              <span className="font-bold text-[#00a651]">{formatOdds(totalOdds)}</span>
            </div>
            <label className="flex items-center justify-between gap-2 text-[12px]">
              <span className="text-black/50">{t("hero.stake")}</span>
              <input
                value={stake}
                onChange={(event) => setStake(event.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                className="h-8 w-[120px] border border-black/15 bg-[#f7f7f7] px-2 text-right font-semibold outline-none focus:border-[#00c853]"
              />
            </label>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-black/50">{t("hero.potentialWin")}</span>
              <span className="font-bold">{formatMoney(potential, country, locale)}</span>
            </div>
            <button
              type="button"
              onClick={onPlace}
              className="h-9 w-full bg-[#e31c23] text-[13px] font-bold text-white hover:bg-[#c7181e]"
            >
              {t("hero.placeBet")}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-black/40">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
