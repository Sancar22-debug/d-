"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import { company } from "@/data/company";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 100]);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Split hero title into lines
  const titleLines = company.hero.title.split(" ");
  // "СТРОИМ" / "ПРОСТРАНСТВА" / "ДЛЯ ЖИЗНИ"
  const formattedLines = [titleLines[0], titleLines[1], titleLines.slice(2).join(" ")];

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      {/* Sky background with parallax */}
      <motion.div className={styles.skyBg} style={{ y: bgY }}>
        <Image
          src="/images/hero-sky.png"
          alt="DOMINANT+ — Строим пространства для жизни"
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.skyImage}
        />
      </motion.div>

      {/* Soft overlays for readability */}
      <div className={styles.overlayBase} />
      <div className={styles.overlayGlow} />

      {/* Hero title */}
      <div className={styles.titleLayer}>
        <h1 className={styles.title}>
          {formattedLines.map((line, i) => (
            <motion.span
              key={i}
              className={styles.titleLine}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Bottom content — subtitle + buttons */}
      <div className={styles.bottomContent}>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
        >
          {company.hero.subtitle}
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        >
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo("#projects")}
          >
            Смотреть объекты
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => scrollTo("#contact")}
          >
            Оставить заявку
          </button>
        </motion.div>
      </div>
    </section>
  );
}
