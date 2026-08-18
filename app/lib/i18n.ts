export const COUNTRY_COOKIE = "farima-country";
export const DEFAULT_COUNTRY = "bf";

export const countries = [
  { code: "bf", locale: "fr", flag: "🇧🇫", dial: "226", name: { en: "Burkina Faso", fr: "Burkina Faso" } },
  { code: "ci", locale: "fr", flag: "🇨🇮", dial: "225", name: { en: "Côte d'Ivoire", fr: "Côte d'Ivoire" } },
  { code: "sn", locale: "fr", flag: "🇸🇳", dial: "221", name: { en: "Senegal", fr: "Sénégal" } },
  { code: "ml", locale: "fr", flag: "🇲🇱", dial: "223", name: { en: "Mali", fr: "Mali" } },
  { code: "ng", locale: "en", flag: "🇳🇬", dial: "234", name: { en: "Nigeria", fr: "Nigéria" } },
  { code: "gh", locale: "en", flag: "🇬🇭", dial: "233", name: { en: "Ghana", fr: "Ghana" } },
] as const;

export type CountryCode = (typeof countries)[number]["code"];
export type Locale = (typeof countries)[number]["locale"];

export const messages = {
  en: {
    nav: {
      sports: "Sports",
      games: "Games",
      live: "Live Betting",
      fantasy: "Fantasy",
      instant: "Instant Football",
      virtuals: "Scheduled Virtuals",
      jackpot: "Jackpot",
      livescore: "Livescore",
      results: "Results",
      promotions: "Promotions",
      loyalty: "Loyalty",
      app: "App",
      hot: "Hot",
    },
    auth: {
      mobile: "Mobile Number",
      password: "Password",
      createPassword: "Create password",
      login: "Login",
      register: "Register",
      keepSignedIn: "Keep me signed in",
      forgotPassword: "Forgot Password?",
    },
    header: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      playResponsiblyLine1: "Play",
      playResponsiblyLine2: "Responsibly",
      country: "Country",
    },
    sports: {
      football: "Football",
      basketball: "Basketball",
      tennis: "Tennis",
      iceHockey: "Ice Hockey",
      volleyball: "Volleyball",
      tableTennis: "Table Tennis",
      cricket: "Cricket",
      boxing: "Boxing",
      rugby: "Rugby",
      esports: "Esports",
      more: "More",
      handball: "Handball",
      snooker: "Snooker",
      futsal: "Futsal",
      baseball: "Baseball",
      mma: "MMA",
      golf: "Golf",
    },
    home: {
      sports: "Sports",
    },
    hero: {
      search: "Search events",
      popular: "Popular",
      todaysFootball: "Today",
      upcoming: "Upcoming Games",
      live: "Live",
      highlights: "Highlights",
      moreSports: "More Sports",
      events: "Events",
      betslip: "Betslip",
      singles: "Singles",
      multiple: "Multiple",
      emptyBetslip: "Your betslip is empty",
      emptyBetslipHint: "Click the odds to add a selection.",
      stake: "Stake",
      potentialWin: "Potential Win",
      placeBet: "Place Bet",
      totalOdds: "Total Odds",
      markets: "Markets",
      home: "1",
      draw: "X",
      away: "2",
      drawLabel: "Draw",
      liveNow: "LIVE",
      boost: "Boost",
      print: "Print",
      refresh: "Refresh",
      noEvents: "No events available right now.",
      placed: "Bet placed. Good luck!",
      remove: "Remove",
      instantTitle: "Instant Registration",
      instantSubtitle: "Make a Deposit and Start Betting!",
      cashout: "Cash Out",
      cashoutAction: "Cash Out",
      cashoutEmpty: "You have no bets available for cash out.",
      cashoutStake: "Stake",
      cashedOut: "Cashed out",
      banners: {
        welcomeKicker: "New players",
        welcomeTitle: "100% Welcome Bonus",
        welcomeSubtitle: "Get up to 50,000 on your first deposit.",
        welcomeCta: "Join Now",
        jackpotKicker: "Super Jackpot",
        jackpotTitle: "Win 250,000,000",
        jackpotSubtitle: "Predict 10 matches. One coupon. One huge prize.",
        jackpotCta: "Play Jackpot",
        liveKicker: "In-play",
        liveTitle: "Bet Live. Every Minute.",
        liveSubtitle: "Odds that move with the action on the pitch.",
        liveCta: "Go Live",
        accaKicker: "Acca Boost",
        accaTitle: "Up to +50% Extra",
        accaSubtitle: "Boost your winnings on 3+ fold accumulators.",
        accaCta: "Build Acca",
      },
    },
    pages: {
      games: {
        title: "Games",
        subtitle: "Fast games and instant action between live matches.",
      },
      live: {
        title: "Live",
        subtitle: "In-play markets and live odds, updating as the action unfolds.",
      },
      fantasy: {
        title: "Fantasy",
        subtitle: "Build your squad and compete in fantasy contests.",
      },
      instant: {
        title: "Instant Football",
        subtitle: "Quick-play games with instant results.",
      },
      virtuals: {
        title: "Virtuals",
        subtitle: "Simulated sports that settle in minutes, around the clock.",
      },
      jackpot: {
        title: "Jackpot",
        subtitle: "Predict the results, hit the coupon, and chase the jackpot prize.",
      },
      livescore: {
        title: "Livescore",
        subtitle: "Follow live scores and match stats as they happen.",
      },
      results: {
        title: "Results",
        subtitle: "Check settled fixtures and final scores.",
      },
      promotions: {
        title: "Promotions",
        subtitle: "Boosts, gifts, and current Fanma Game offers.",
      },
      loyalty: {
        title: "Loyalty",
        subtitle: "Earn rewards as you play, challenge, and win.",
      },
      app: {
        title: "App",
        subtitle: "Get the Fanma Game app for faster live betting on mobile.",
      },
      search: {
        title: "Search",
        empty: "Enter a team, league, or event.",
        resultsFor: "Results for",
      },
      about: {
        title: "About Us",
        subtitle: "Fanma Game is a sports betting and live gaming platform for players across West Africa.",
      },
      privacy: {
        title: "Privacy Policy",
        subtitle: "How we collect, use, and protect your information when you play on Fanma Game.",
      },
      terms: {
        title: "Terms & Conditions",
        subtitle: "The rules that apply when you register, deposit, and place bets on Fanma Game.",
      },
      responsible: {
        title: "Responsible Gambling",
        subtitle: "Tools and advice to help you stay in control. Fanma Game is for players aged 18+ only.",
      },
      faq: {
        title: "FAQ",
        subtitle: "Answers to common questions about registration, deposits, odds, and cash out.",
      },
    },
    footer: {
      howToPlay: "How To Play",
      company: "Fanma Game",
      help: "Help",
      payments: "Payment Methods",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      responsible: "Responsible Gambling",
      faq: "FAQ",
      getApp: "Get the App",
      appHint: "Faster live betting on your phone.",
      playResponsibly: "Play Responsibly",
      copyright: "All rights reserved.",
      disclaimer: "Gambling can be addictive. Please play responsibly. 18+ only.",
      license: "Demo platform for illustration only. Not a licensed operator.",
    },
  },
  fr: {
    nav: {
      sports: "Sports",
      games: "Jeux",
      live: "Paris en Direct",
      fantasy: "Fantasy",
      instant: "Foot Instantané",
      virtuals: "Virtuels Programmés",
      jackpot: "Jackpot",
      livescore: "Livescore",
      results: "Résultats",
      promotions: "Promotions",
      loyalty: "Fidélité",
      app: "App",
      hot: "Top",
    },
    auth: {
      mobile: "Numéro de téléphone",
      password: "Mot de passe",
      createPassword: "Créer un mot de passe",
      login: "Connexion",
      register: "S'inscrire",
      keepSignedIn: "Rester connecté",
      forgotPassword: "Mot de passe oublié ?",
    },
    header: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      playResponsiblyLine1: "Jouez",
      playResponsiblyLine2: "responsable",
      country: "Pays",
    },
    sports: {
      football: "Football",
      basketball: "Basketball",
      tennis: "Tennis",
      iceHockey: "Hockey sur glace",
      volleyball: "Volleyball",
      tableTennis: "Tennis de table",
      cricket: "Cricket",
      boxing: "Boxe",
      rugby: "Rugby",
      esports: "Esport",
      more: "Plus",
      handball: "Handball",
      snooker: "Snooker",
      futsal: "Futsal",
      baseball: "Baseball",
      mma: "MMA",
      golf: "Golf",
    },
    home: {
      sports: "Sports",
    },
    hero: {
      search: "Rechercher un événement",
      popular: "Populaires",
      todaysFootball: "Aujourd'hui",
      upcoming: "À venir",
      live: "Direct",
      highlights: "À la une",
      moreSports: "Plus de sports",
      events: "Événements",
      betslip: "Ticket",
      singles: "Simples",
      multiple: "Combiné",
      emptyBetslip: "Votre ticket est vide",
      emptyBetslipHint: "Cliquez sur une cote pour ajouter une sélection.",
      stake: "Mise",
      potentialWin: "Gain potentiel",
      placeBet: "Placer le pari",
      totalOdds: "Cote totale",
      markets: "Marchés",
      home: "1",
      draw: "X",
      away: "2",
      drawLabel: "Nul",
      liveNow: "DIRECT",
      boost: "Boost",
      print: "Imprimer",
      refresh: "Actualiser",
      noEvents: "Aucun événement pour le moment.",
      placed: "Pari placé. Bonne chance !",
      remove: "Retirer",
      instantTitle: "Inscription instantanée",
      instantSubtitle: "Déposez et commencez à parier !",
      cashout: "Retrait anticipé",
      cashoutAction: "Encaisser",
      cashoutEmpty: "Vous n'avez aucun pari disponible en retrait anticipé.",
      cashoutStake: "Mise",
      cashedOut: "Retrait effectué",
      banners: {
        welcomeKicker: "Nouveaux joueurs",
        welcomeTitle: "Bonus de bienvenue 100%",
        welcomeSubtitle: "Jusqu'à 50 000 sur votre premier dépôt.",
        welcomeCta: "S'inscrire",
        jackpotKicker: "Super Jackpot",
        jackpotTitle: "Gagnez 250 000 000",
        jackpotSubtitle: "Pronostiquez 10 matchs. Un coupon. Un énorme lot.",
        jackpotCta: "Jouer au jackpot",
        liveKicker: "En direct",
        liveTitle: "Pariez en live. Chaque minute.",
        liveSubtitle: "Des cotes qui bougent avec le match.",
        liveCta: "Voir le live",
        accaKicker: "Boost combiné",
        accaTitle: "Jusqu'à +50% en extra",
        accaSubtitle: "Boostez vos gains dès 3 sélections.",
        accaCta: "Composer",
      },
    },
    pages: {
      games: {
        title: "Jeux",
        subtitle: "Jeux rapides et action instantanée entre les matchs en direct.",
      },
      live: {
        title: "Direct",
        subtitle: "Marchés en cours et cotes live, mises à jour au fil du jeu.",
      },
      fantasy: {
        title: "Fantasy",
        subtitle: "Constituez votre équipe et participez aux concours fantasy.",
      },
      instant: {
        title: "Foot Instantané",
        subtitle: "Jeux rapides avec résultats immédiats.",
      },
      virtuals: {
        title: "Virtuels",
        subtitle: "Sports simulés qui se jouent en quelques minutes, 24h/24.",
      },
      jackpot: {
        title: "Jackpot",
        subtitle: "Pronostiquez les résultats, validez le coupon et visez le jackpot.",
      },
      livescore: {
        title: "Livescore",
        subtitle: "Suivez les scores et statistiques en direct.",
      },
      results: {
        title: "Résultats",
        subtitle: "Consultez les matchs terminés et les scores finaux.",
      },
      promotions: {
        title: "Promotions",
        subtitle: "Bonus, cadeaux et offres Fanma Game du moment.",
      },
      loyalty: {
        title: "Fidélité",
        subtitle: "Gagnez des récompenses en jouant, en relevant des défis et en gagnant.",
      },
      app: {
        title: "Application",
        subtitle: "Téléchargez l'appli Fanma Game pour parier plus vite en direct.",
      },
      search: {
        title: "Recherche",
        empty: "Saisissez une équipe, une ligue ou un événement.",
        resultsFor: "Résultats pour",
      },
      about: {
        title: "À propos",
        subtitle: "Fanma Game est une plateforme de paris sportifs et de jeux en direct pour l'Afrique de l'Ouest.",
      },
      privacy: {
        title: "Politique de confidentialité",
        subtitle: "Comment nous collectons, utilisons et protégeons vos informations sur Fanma Game.",
      },
      terms: {
        title: "Conditions générales",
        subtitle: "Les règles qui s'appliquent lorsque vous vous inscrivez, déposez et pariez sur Fanma Game.",
      },
      responsible: {
        title: "Jeu responsable",
        subtitle: "Des outils et des conseils pour garder le contrôle. Fanma Game est réservé aux 18 ans et plus.",
      },
      faq: {
        title: "FAQ",
        subtitle: "Réponses aux questions fréquentes sur l'inscription, les dépôts, les cotes et le retrait anticipé.",
      },
    },
    footer: {
      howToPlay: "Comment jouer",
      company: "Fanma Game",
      help: "Aide",
      payments: "Moyens de paiement",
      about: "À propos",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
      responsible: "Jeu responsable",
      faq: "FAQ",
      getApp: "Télécharger l'appli",
      appHint: "Pariez plus vite en direct depuis votre téléphone.",
      playResponsibly: "Jouez responsable",
      copyright: "Tous droits réservés.",
      disclaimer: "Les jeux d'argent peuvent créer une dépendance. Jouez de manière responsable. 18+ uniquement.",
      license: "Plateforme de démonstration uniquement. Il ne s'agit pas d'un opérateur agréé.",
    },
  },
} as const;

export type SectionKey = keyof typeof messages.en.pages;

export function isCountryCode(value: string | undefined | null): value is CountryCode {
  return countries.some((country) => country.code === value);
}

export function parseCountry(value: string | undefined | null): CountryCode {
  return isCountryCode(value) ? value : DEFAULT_COUNTRY;
}

export function countryByCode(code: CountryCode) {
  return countries.find((country) => country.code === code) ?? countries[0];
}

export function localeForCountry(code: CountryCode): Locale {
  return countryByCode(code).locale;
}

export function persistCountry(code: CountryCode) {
  document.cookie = `${COUNTRY_COOKIE}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
