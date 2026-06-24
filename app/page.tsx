"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import HeroContent from "@/components/HeroContent";
import ProjectCategories from "@/components/ProjectCategories";
import ProjectDocumentsSection from "@/components/ProjectDocumentsSection";
import Footer from "@/components/Footer";
import { ProjectStatus } from "@/data/projects";
import { useLanguage } from "@/components/LanguageContext";
import styles from "@/components/Hero.module.css";
import heroSkyImg from "@/public/images/back.webp";

type ActiveView = "hero" | "projects";

export default function Home() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<ActiveView>("hero");
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectStatus | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Initial load effect
  useEffect(() => {
    // Wait a brief moment for fonts/styles to parse, then remove splash screen
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
    }, 1500); // 1.5s splash screen
    return () => clearTimeout(timer);
  }, []);

  /* ── Debounced view transitions ── */
  const switchView = useCallback((view: ActiveView) => {
    setIsTransitioning((prev) => {
      if (prev) return prev;
      
      if (view === "hero") {
        setSelectedCategory(null);
      }
      setActiveView(view);

      // Cooldown to prevent rapid firing and to lock scroll during animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      
      return true;
    });
  }, []);

  const goToProjects = useCallback(() => switchView("projects"), [switchView]);
  const goToHero = useCallback(() => switchView("hero"), [switchView]);

  const goToContact = useCallback(() => {
    switchView("projects");
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [switchView]);

  /* ── Scroll / touch / key detection ── */
  useEffect(() => {
    let lastTouchY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Hero → scroll down → projects
      if (activeView === "hero" && e.deltaY > 20) {
        goToProjects();
        return;
      }
      // Projects (3 boxes, no category selected) → scroll up → hero
      if (activeView === "projects" && !selectedCategory && e.deltaY < -20) {
        if (window.scrollY <= 0) {
          goToHero();
        }
        return;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diff = lastTouchY - e.touches[0].clientY;
      // Swipe up → go to projects
      if (activeView === "hero" && diff > 15) {
        goToProjects();
        return;
      }
      // Swipe down → go back to hero
      if (activeView === "projects" && !selectedCategory && diff < -15) {
        if (window.scrollY <= 0) {
          goToHero();
        }
        return;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeView === "hero") {
        if (
          e.key === "ArrowDown" ||
          e.key === "PageDown" ||
          e.key === " "
        ) {
          e.preventDefault();
          goToProjects();
        }
      }
      if (activeView === "projects" && !selectedCategory) {
        if (e.key === "ArrowUp" || e.key === "PageUp") {
          if (window.scrollY <= 0) {
            e.preventDefault();
            goToHero();
          }
        }
        if (e.key === "Escape") {
          e.preventDefault();
          goToHero();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeView, selectedCategory, goToProjects, goToHero]);

  /* ── Lock scroll: ONLY on hero view or during transitions ── */
  useEffect(() => {
    // Lock scroll if on hero, OR if we are currently transitioning (to freeze the view while boxes load)
    const shouldLock = activeView === "hero" || isTransitioning;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeView, isTransitioning]);

  return (
    <>
      <AnimatePresence>
        {!isAppLoaded && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <Image src="/images/dominant-logo-white.webp" alt="DOMINANT+" width={200} height={40} className="h-6 w-auto mb-6 opacity-90" unoptimized />
              <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-white/60 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header onContact={goToContact} onHome={goToHero} />

      {/* ── Fixed sky background — always visible, never moves ── */}
      <div className={styles.skyBg}>
        <Image
          src={heroSkyImg}
          alt={t("hero.alt")}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className={styles.skyImage}
          quality={100}
          unoptimized={true}
        />
      </div>
      <div className={styles.overlayBase} />
      <div className={styles.overlayGlow} />

      <main className="relative z-[2]">
        <AnimatePresence mode="wait">
          {activeView === "hero" ? (
            <HeroContent key="hero" onExplore={goToProjects} onContact={goToContact} />
          ) : (
            <ProjectCategories
              key="projects"
              selectedCategory={selectedCategory}
              onSelectCategory={(status) => setSelectedCategory(status)}
              onBack={() => setSelectedCategory(null)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer is visible on all project screens, wrapped to be ABOVE the fixed sky background */}
      {activeView === "projects" && (
        <div className="relative z-[2] bg-black">
          <ProjectDocumentsSection />
          <Footer />
        </div>
      )}
    </>
  );
}
