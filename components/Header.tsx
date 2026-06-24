"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { useLanguage } from "./LanguageContext";
import { type Lang } from "@/data/translations";

export default function Header({ onContact, onHome, onNavClick }: { onContact?: () => void, onHome?: () => void, onNavClick?: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  const allLangs: Lang[] = ["RU", "EN", "KG"];
  const otherLangs = allLangs.filter((l) => l !== lang);

  const navLinks = [
    { label: t("nav.objects"), href: "#projects" },
    { label: t("nav.documents"), href: "#documents" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      if (onNavClick) {
        onNavClick(href);
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [onNavClick]
  );

  const handleLangSelect = (selectedLang: Lang) => {
    setLang(selectedLang);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <>
      <header
        id="header"
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          {/* Left — DOMINANT+ logo */}
          <a
            href="#hero"
            className={styles.logoLeft}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              if (onHome) {
                onHome();
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                handleNavClick(e, "#hero");
              }
            }}
          >
            <Image
              src="/images/dominant-logo-white.webp"
              alt="DOMINANT+"
              width={140}
              height={20}
              priority
              className={styles.logoImage}
            />
          </a>

          {/* Right — Desktop nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            
            {/* Language Dropdown */}
            <div className={styles.langDropdown} ref={langRef}>
              <button
                className={styles.langTrigger}
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-label="Change language"
              >
                <svg className={styles.langIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8.5" />
                  <path d="M1.5 10h17M10 1.5c-2.5 3-3.5 5.5-3.5 8.5s1 5.5 3.5 8.5M10 1.5c2.5 3 3.5 5.5 3.5 8.5s-1 5.5-3.5 8.5" />
                </svg>
                <span className={styles.langLabel}>{lang}</span>
                <svg
                  className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ""}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>

              <div className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ""}`}>
                {otherLangs.map((l) => (
                  <button
                    key={l}
                    className={styles.langOption}
                    onClick={() => handleLangSelect(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className={styles.ctaButton}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                if (onContact) onContact();
                else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("nav.cta")}
            </a>
          </nav>

          {/* Right — Mobile burger */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav className={styles.mobileNav}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Language Selector */}
          <div
            className={styles.mobileLangSelector}
            style={{ transitionDelay: menuOpen ? `${120 + navLinks.length * 60}ms` : "0ms" }}
            ref={mobileLangRef}
          >
            <button
              className={styles.mobileLangTrigger}
              onClick={() => setMobileLangOpen((v) => !v)}
            >
              <svg className={styles.mobileLangIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8.5" />
                <path d="M1.5 10h17M10 1.5c-2.5 3-3.5 5.5-3.5 8.5s1 5.5 3.5 8.5M10 1.5c2.5 3 3.5 5.5 3.5 8.5s-1 5.5-3.5 8.5" />
              </svg>
              <span>{lang}</span>
              <svg
                className={`${styles.mobileLangChevron} ${mobileLangOpen ? styles.mobileLangChevronOpen : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
            <div className={`${styles.mobileLangMenu} ${mobileLangOpen ? styles.mobileLangMenuOpen : ""}`}>
              {otherLangs.map((l) => (
                <button
                  key={l}
                  className={styles.mobileLangOption}
                  onClick={() => handleLangSelect(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className={styles.mobileCta}
            style={{ transitionDelay: menuOpen ? `${120 + (navLinks.length + 1) * 60}ms` : "0ms" }}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              if (onContact) onContact();
              else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("nav.cta")}
          </a>
        </nav>
      </div>
    </>
  );
}
