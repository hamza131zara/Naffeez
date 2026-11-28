import type { Metadata, Viewport } from "next";
import { StoreHeader } from "@/components/store-header";
import { StoreFooter } from "@/components/store-footer";
import { NoticeRegion } from "@/components/notice-region";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Naffeez — Modern Menswear", template: "%s | Naffeez" },
  description: "Discover your style. Explore every detail. Shop with confidence.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://naffeez.com"),
  applicationName: "Naffeez",
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808"
};

const themeBootstrap = `(() => {
  try {
    const saved = localStorage.getItem("naffeez-theme");
    const preference = saved === "light" || saved === "dark" ? saved : "system";
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = preference === "system" ? (dark ? "dark" : "light") : preference;
    document.documentElement.dataset.themePreference = preference;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.themePreference = "system";
  }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <StoreHeader />
        <main id="main-content">{children}</main>
        <StoreFooter />
        <NoticeRegion />
      </body>
    </html>
  );
}