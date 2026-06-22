"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { useLanguage } from "./LanguageContext";

interface HeroContentProps {
  onExplore: () => void;
  onContact?: () => void;
}

export default function HeroContent({ onExplore, onContact }: HeroContentProps) {
  const { lang, t } = useLanguage();

  const titleText = t("hero.title");
  const needsCompact = titleText.length > 30;
  const formattedLines = titleText.split("\n");

  return (
    <motion.section
      id="hero"
      className={styles.hero}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      {/* Hero title */}
      <div className={styles.titleLayer}>
        <h1 className={`${styles.title} ${needsCompact ? styles.titleCompact : ""}`}>
          {formattedLines.map((line, i) => (
            <motion.span
              key={i}
              className={styles.titleLine}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <button className={styles.btnPrimary} onClick={onExplore}>
            {t("hero.explore")}
          </button>
          <button className={styles.btnSecondary} onClick={onContact || onExplore}>
            {t("hero.contact")}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
