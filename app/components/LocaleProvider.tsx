"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  localeForCountry,
  messages,
  persistCountry,
  type CountryCode,
  type Locale,
} from "../lib/i18n";

type I18nContextValue = {
  country: CountryCode;
  locale: Locale;
  setCountry: (code: CountryCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function lookup(locale: Locale, key: string): string {
  const parts = key.split(".");
  let current: unknown = messages[locale];
  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return key;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : key;
}

export function LocaleProvider({
  initialCountry,
  children,
}: {
  initialCountry: CountryCode;
  children: React.ReactNode;
}) {
  const [country, setCountryState] = useState<CountryCode>(initialCountry);
  const locale = localeForCountry(country);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setCountry = useCallback((code: CountryCode) => {
    setCountryState(code);
    persistCountry(code);
  }, []);

  const t = useCallback((key: string) => lookup(locale, key), [locale]);

  const value = useMemo(
    () => ({ country, locale, setCountry, t }),
    [country, locale, setCountry, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return context;
}
