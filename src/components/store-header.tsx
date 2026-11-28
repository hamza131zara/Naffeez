"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop?collection=all" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Journal", href: "/journal" }
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">THE NAFFEEZ EDIT · MODERN MENSWEAR</div>
      <header className="site-header">
        <div className="site-header__inner container">
          <Link className="wordmark" href="/" aria-label="Naffeez home">NAFFEEZ</Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
            <span className="nav-coming-soon" aria-label="AI Style Studio coming soon">AI STYLE STUDIO <small>SOON</small></span>
          </nav>

          <div className="header-actions">
            <Link className="header-action" href="/shop?focus=search" aria-label="Search products">⌕</Link>
            <Link className="header-action header-action--account" href="/account" aria-label="Account">♙</Link>
            <Link className="header-action" href="/wishlist" aria-label="Wishlist">♡</Link>
            <Link className="header-action" href="/cart" aria-label="Shopping bag">♧</Link>
            <ThemeToggle />
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav container" id="mobile-navigation" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/account" onClick={() => setMenuOpen(false)}>Account</Link>
            <Link href="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            <Link href="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        )}
      </header>
    </>
  );
}