import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./components/LocaleProvider";
import "./globals.css";
import { localeForCountry, parseCountry, COUNTRY_COOKIE } from "./lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fanma Game — Jouez · Défiez · Gagnez",
  description:
    "Fanma Game: paris sportifs, live betting, jackpot, virtuels et jeux en ligne.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const country = parseCountry(cookieStore.get(COUNTRY_COOKIE)?.value);
  const locale = localeForCountry(country);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black font-sans text-white">
        <LocaleProvider initialCountry={country}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
