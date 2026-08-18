export type SportId =
  | "football"
  | "basketball"
  | "tennis"
  | "ice-hockey"
  | "volleyball"
  | "table-tennis"
  | "cricket"
  | "boxing"
  | "rugby"
  | "esports"
  | "handball"
  | "snooker"
  | "futsal"
  | "baseball"
  | "mma"
  | "golf";

export type Market = "home" | "draw" | "away";

export type Team = {
  name: string;
  short: string;
  color: string;
};

export type Match = {
  id: string;
  sport: SportId;
  league: string;
  kickoff: string;
  home: Team;
  away: Team;
  marketsCount: number;
  boosted?: boolean;
  featured?: boolean;
  live?: { minute: number; home: number; away: number };
  odds: { home: number; draw?: number; away: number };
};

export const sportsCatalog: { id: SportId; key: string; count: number }[] = [
  { id: "football", key: "sports.football", count: 412 },
  { id: "basketball", key: "sports.basketball", count: 86 },
  { id: "tennis", key: "sports.tennis", count: 54 },
  { id: "ice-hockey", key: "sports.iceHockey", count: 21 },
  { id: "volleyball", key: "sports.volleyball", count: 33 },
  { id: "table-tennis", key: "sports.tableTennis", count: 47 },
  { id: "cricket", key: "sports.cricket", count: 18 },
  { id: "boxing", key: "sports.boxing", count: 9 },
  { id: "rugby", key: "sports.rugby", count: 14 },
  { id: "esports", key: "sports.esports", count: 27 },
  { id: "handball", key: "sports.handball", count: 16 },
  { id: "snooker", key: "sports.snooker", count: 8 },
  { id: "futsal", key: "sports.futsal", count: 12 },
  { id: "baseball", key: "sports.baseball", count: 22 },
  { id: "mma", key: "sports.mma", count: 6 },
  { id: "golf", key: "sports.golf", count: 4 },
];

export const banners = [
  {
    id: "welcome",
    tone: "green" as const,
    kickerKey: "hero.banners.welcomeKicker",
    titleKey: "hero.banners.welcomeTitle",
    subtitleKey: "hero.banners.welcomeSubtitle",
    ctaKey: "hero.banners.welcomeCta",
    href: "/join",
  },
  {
    id: "jackpot",
    tone: "red" as const,
    kickerKey: "hero.banners.jackpotKicker",
    titleKey: "hero.banners.jackpotTitle",
    subtitleKey: "hero.banners.jackpotSubtitle",
    ctaKey: "hero.banners.jackpotCta",
    href: "/jackpot",
  },
  {
    id: "live",
    tone: "dark" as const,
    kickerKey: "hero.banners.liveKicker",
    titleKey: "hero.banners.liveTitle",
    subtitleKey: "hero.banners.liveSubtitle",
    ctaKey: "hero.banners.liveCta",
    href: "/live",
  },
  {
    id: "acca",
    tone: "gold" as const,
    kickerKey: "hero.banners.accaKicker",
    titleKey: "hero.banners.accaTitle",
    subtitleKey: "hero.banners.accaSubtitle",
    ctaKey: "hero.banners.accaCta",
    href: "/",
  },
] as const;

export const matches: Match[] = [
  {
    id: "el-clasico",
    sport: "football",
    league: "Spain — La Liga",
    kickoff: "2026-08-18T21:00:00",
    home: { name: "Real Madrid", short: "RMA", color: "#ffffff" },
    away: { name: "Barcelona", short: "BAR", color: "#a50044" },
    marketsCount: 186,
    boosted: true,
    featured: true,
    odds: { home: 2.15, draw: 3.45, away: 3.3 },
  },
  {
    id: "afcon-nga-gha",
    sport: "football",
    league: "Africa Cup of Nations",
    kickoff: "2026-08-18T16:00:00",
    home: { name: "Nigeria", short: "NGA", color: "#008751" },
    away: { name: "Ghana", short: "GHA", color: "#ce1126" },
    marketsCount: 94,
    featured: true,
    live: { minute: 67, home: 1, away: 1 },
    odds: { home: 2.05, draw: 3.1, away: 3.85 },
  },
  {
    id: "afcon-sen-bfa",
    sport: "football",
    league: "Africa Cup of Nations",
    kickoff: "2026-08-18T16:00:00",
    home: { name: "Senegal", short: "SEN", color: "#00853f" },
    away: { name: "Burkina Faso", short: "BFA", color: "#ef2b2d" },
    marketsCount: 88,
    featured: true,
    live: { minute: 34, home: 2, away: 0 },
    odds: { home: 1.42, draw: 4.2, away: 7.5 },
  },
  {
    id: "epl-ars-che",
    sport: "football",
    league: "England — Premier League",
    kickoff: "2026-08-18T16:00:00",
    home: { name: "Arsenal", short: "ARS", color: "#ef0107" },
    away: { name: "Chelsea", short: "CHE", color: "#034694" },
    marketsCount: 154,
    boosted: true,
    odds: { home: 1.95, draw: 3.6, away: 3.9 },
  },
  {
    id: "epl-mci-liv",
    sport: "football",
    league: "England — Premier League",
    kickoff: "2026-08-18T18:30:00",
    home: { name: "Manchester City", short: "MCI", color: "#6cabdd" },
    away: { name: "Liverpool", short: "LIV", color: "#c8102e" },
    marketsCount: 171,
    live: { minute: 12, home: 0, away: 0 },
    odds: { home: 1.88, draw: 3.75, away: 4.1 },
  },
  {
    id: "epl-tot-new",
    sport: "football",
    league: "England — Premier League",
    kickoff: "2026-08-19T15:00:00",
    home: { name: "Tottenham", short: "TOT", color: "#132257" },
    away: { name: "Newcastle", short: "NEW", color: "#241f20" },
    marketsCount: 132,
    odds: { home: 2.2, draw: 3.4, away: 3.25 },
  },
  {
    id: "l1-psg-om",
    sport: "football",
    league: "France — Ligue 1",
    kickoff: "2026-08-18T20:45:00",
    home: { name: "Paris SG", short: "PSG", color: "#004170" },
    away: { name: "Marseille", short: "OM", color: "#2faee0" },
    marketsCount: 148,
    boosted: true,
    odds: { home: 1.48, draw: 4.5, away: 6.2 },
  },
  {
    id: "l1-lyon-monaco",
    sport: "football",
    league: "France — Ligue 1",
    kickoff: "2026-08-19T17:00:00",
    home: { name: "Lyon", short: "LYO", color: "#d32d41" },
    away: { name: "Monaco", short: "ASM", color: "#e31837" },
    marketsCount: 101,
    odds: { home: 2.45, draw: 3.35, away: 2.85 },
  },
  {
    id: "sa-inter-milan",
    sport: "football",
    league: "Italy — Serie A",
    kickoff: "2026-08-18T20:45:00",
    home: { name: "Inter", short: "INT", color: "#010e80" },
    away: { name: "Milan", short: "MIL", color: "#ac002d" },
    marketsCount: 163,
    odds: { home: 2.3, draw: 3.25, away: 3.15 },
  },
  {
    id: "sa-juv-nap",
    sport: "football",
    league: "Italy — Serie A",
    kickoff: "2026-08-19T18:30:00",
    home: { name: "Juventus", short: "JUV", color: "#000000" },
    away: { name: "Napoli", short: "NAP", color: "#12a0c8" },
    marketsCount: 119,
    odds: { home: 2.55, draw: 3.2, away: 2.8 },
  },
  {
    id: "caf-ahl-esp",
    sport: "football",
    league: "CAF Champions League",
    kickoff: "2026-08-18T19:00:00",
    home: { name: "Al Ahly", short: "AHL", color: "#c8102e" },
    away: { name: "Espérance", short: "EST", color: "#e30613" },
    marketsCount: 76,
    odds: { home: 1.72, draw: 3.55, away: 5.1 },
  },
  {
    id: "caf-wyd-sun",
    sport: "football",
    league: "CAF Champions League",
    kickoff: "2026-08-19T18:00:00",
    home: { name: "Wydad AC", short: "WAC", color: "#d21034" },
    away: { name: "Mamelodi Sundowns", short: "SUN", color: "#ffcc00" },
    marketsCount: 69,
    odds: { home: 2.6, draw: 3.15, away: 2.75 },
  },
  {
    id: "afcon-civ-mli",
    sport: "football",
    league: "Africa Cup of Nations",
    kickoff: "2026-08-18T19:30:00",
    home: { name: "Côte d'Ivoire", short: "CIV", color: "#f77f00" },
    away: { name: "Mali", short: "MLI", color: "#14b53a" },
    marketsCount: 82,
    odds: { home: 2.1, draw: 3.05, away: 3.7 },
  },
  {
    id: "ucl-bay-dor",
    sport: "football",
    league: "UEFA Champions League",
    kickoff: "2026-08-20T21:00:00",
    home: { name: "Bayern Munich", short: "BAY", color: "#dc052d" },
    away: { name: "Borussia Dortmund", short: "BVB", color: "#fde100" },
    marketsCount: 142,
    boosted: true,
    odds: { home: 1.7, draw: 4.05, away: 4.6 },
  },
  {
    id: "nba-lal-bos",
    sport: "basketball",
    league: "NBA",
    kickoff: "2026-08-18T17:30:00",
    home: { name: "LA Lakers", short: "LAL", color: "#552583" },
    away: { name: "Boston Celtics", short: "BOS", color: "#007a33" },
    marketsCount: 64,
    featured: true,
    live: { minute: 38, home: 84, away: 81 },
    odds: { home: 1.82, away: 1.98 },
  },
  {
    id: "nba-gsw-mia",
    sport: "basketball",
    league: "NBA",
    kickoff: "2026-08-19T02:00:00",
    home: { name: "Golden State", short: "GSW", color: "#1d428a" },
    away: { name: "Miami Heat", short: "MIA", color: "#98002e" },
    marketsCount: 58,
    odds: { home: 1.65, away: 2.25 },
  },
  {
    id: "atp-alc-sin",
    sport: "tennis",
    league: "ATP Masters 1000",
    kickoff: "2026-08-18T15:00:00",
    home: { name: "C. Alcaraz", short: "ALC", color: "#c60b1e" },
    away: { name: "J. Sinner", short: "SIN", color: "#009246" },
    marketsCount: 41,
    featured: true,
    live: { minute: 0, home: 1, away: 1 },
    odds: { home: 1.9, away: 1.9 },
  },
  {
    id: "atp-djo-med",
    sport: "tennis",
    league: "ATP Masters 1000",
    kickoff: "2026-08-18T18:00:00",
    home: { name: "N. Djokovic", short: "DJO", color: "#0c1c8c" },
    away: { name: "L. Musetti", short: "MUS", color: "#009246" },
    marketsCount: 36,
    odds: { home: 1.33, away: 3.4 },
  },
];

export type CashoutBet = {
  id: string;
  league: { en: string; fr: string };
  home: string;
  away: string;
  market: Market;
  odds: number;
  stake: number;
  cashout: number;
  live: { minute: number; home: number; away: number };
};

export const cashoutBets: CashoutBet[] = [
  {
    id: "co-nga-gha",
    league: { en: "Africa Cup of Nations", fr: "Coupe d'Afrique des Nations" },
    home: "Nigeria",
    away: "Ghana",
    market: "home",
    odds: 2.05,
    stake: 2500,
    cashout: 3180,
    live: { minute: 67, home: 1, away: 1 },
  },
  {
    id: "co-mci-liv",
    league: { en: "England — Premier League", fr: "Angleterre — Premier League" },
    home: "Manchester City",
    away: "Liverpool",
    market: "draw",
    odds: 3.75,
    stake: 1000,
    cashout: 890,
    live: { minute: 12, home: 0, away: 0 },
  },
];

/** Frozen "now" so dummy Today / Upcoming tabs stay stable. */
export const HERO_NOW = new Date("2026-08-18T16:20:00");

export const sportIds = sportsCatalog.map((sport) => sport.id);

export function isSportId(value: string | undefined | null): value is SportId {
  return !!value && sportIds.includes(value as SportId);
}

export function parseSport(value: string | string[] | undefined): SportId {
  const raw = Array.isArray(value) ? value[0] : value;
  return isSportId(raw) ? raw : "football";
}

export function marketTeam(match: Match, market: Market) {
  if (market === "home") return match.home.name;
  if (market === "away") return match.away.name;
  return "Draw";
}

export function marketOdds(match: Match, market: Market) {
  if (market === "home") return match.odds.home;
  if (market === "away") return match.odds.away;
  return match.odds.draw;
}
