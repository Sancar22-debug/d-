"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import styles from "./AnimatedBuilding.module.css";

export default function AnimatedBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* Subtle ground glow */}
      <motion.div
        className={styles.groundGlow}
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
      />

      {/* Building with reveal mask */}
      <motion.div
        className={styles.buildingContainer}
        initial={{ y: 180, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: parallaxY }}
      >
        <motion.div
          className={styles.revealMask}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/orion-building.png"
            alt="ЖК ORION — Текущий проект DOMINANT+"
            width={600}
            height={750}
            priority
            unoptimized
            className={styles.buildingImage}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
