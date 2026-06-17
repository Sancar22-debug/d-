"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectStatus, buildingProjects } from "@/data/projects";
import { useLanguage } from "./LanguageContext";

interface Props {
  selectedCategory: ProjectStatus | null;
  onSelectCategory: (status: ProjectStatus) => void;
  onBack: () => void;
  onHome: () => void;
}

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

export default function ProjectCategories({
  selectedCategory,
  onSelectCategory,
  onBack,
  onHome,
}: Props) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    {
      id: "completed" as ProjectStatus,
      title: t("cat.completed.title"),
      description: t("cat.completed.desc"),
    },
    {
      id: "building" as ProjectStatus,
      title: t("cat.building.title"),
      description: t("cat.building.desc"),
    },
    {
      id: "upcoming" as ProjectStatus,
      title: t("cat.upcoming.title"),
      description: t("cat.upcoming.desc"),
    },
  ];

  const advantages = [
    t("adv.1"), t("adv.2"), t("adv.3"), t("adv.4"), t("adv.5"), t("adv.6"),
    t("adv.7"), t("adv.8"), t("adv.9"), t("adv.10"), t("adv.11"), t("adv.12"),
    t("adv.13"), t("adv.14"), t("adv.15"), t("adv.16"), t("adv.17"), t("adv.18"),
  ];

  const handleBack = () => {
    setExpandedProject(null);
    onBack();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── Empty state ─── */
  const renderEmptyState = (text: string) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[40vh]"
    >
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-[2rem] px-12 py-16 max-w-xl text-center">
        <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );

  /* ─── ORION card & details ─── */
  const renderCategoryContent = () => {
    if (selectedCategory === "completed") {
      return renderEmptyState(t("empty.completed"));
    }
    if (selectedCategory === "upcoming") {
      return renderEmptyState(t("empty.upcoming"));
    }
    if (selectedCategory === "building") {
      const orion = buildingProjects.find((p) => p.id === "orion");
      if (!orion) return null;

      return (
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 mt-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-[0_16px_60px_rgb(0,0,0,0.15)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 sm:h-72 lg:h-auto bg-gray-100 relative">
                <img loading="lazy" decoding="async"
                  src={orion.image}
                  alt={orion.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-8 lg:p-16 flex flex-col justify-center">
                <span className="text-sm tracking-wider text-gray-400 uppercase font-semibold mb-3">
                  {t("orion.type")} • {t("orion.class")}
                </span>
                <h3 className="text-4xl sm:text-5xl font-light mb-6 text-[#151719]">
                  {orion.name}
                </h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                  {t("orion.location")}
                </p>
                <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-12">
                  <div>
                    <span className="block text-3xl font-light text-[#151719] mb-2">
                      {orion.floors}
                    </span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.floors")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-3xl font-light text-[#151719] mb-2">
                      {orion.apartments}
                    </span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.apartments")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl font-light text-[#151719] mb-2 leading-tight">
                      {t("orion.parking")}
                    </span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.parking")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl font-light text-[#151719] mb-2 leading-tight">
                      {t("orion.ceilingHeight")}
                    </span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.ceilings")}
                    </span>
                  </div>
                </div>
                {!expandedProject && (
                  <button
                    onClick={() => setExpandedProject(orion.id)}
                    className="self-start px-8 py-4 bg-[#151719] text-white rounded-full hover:bg-black transition-all duration-300 text-sm tracking-wide font-medium hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  >
                    {t("detail.more")}
                  </button>
                )}
              </div>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {expandedProject === orion.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-5 sm:p-8 lg:p-16">
                    {/* ── About ── */}
                    <div className="max-w-3xl mb-20">
                      <h4 className="text-3xl font-light mb-6 text-[#151719]">
                        {t("detail.about")}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {t("orion.description")} {t("detail.aboutText")}
                      </p>
                    </div>

                    {/* ── Key Advantages ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.advantages")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-gray-50 p-5 rounded-2xl">
                            <svg className="w-6 h-6 text-[#151719] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700 text-sm font-medium">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Exterior Gallery ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.exterior")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <img loading="lazy" decoding="async"
                          src="/images/orion/new-exterior-hero.webp"
                          alt="ORION — Вид на здание"
                          className="w-full h-64 sm:h-[400px] object-cover rounded-3xl"
                        />
                        <img loading="lazy" decoding="async"
                          src="/images/orion/new-entrance.webp"
                          alt="ORION — Вход и паркинг"
                          className="w-full h-64 sm:h-[400px] object-cover rounded-3xl"
                        />
                        <img loading="lazy" decoding="async"
                          src="/images/orion/new-exterior-views.webp"
                          alt="ORION — Виды здания"
                          className="w-full sm:col-span-2 h-72 sm:h-[500px] object-cover rounded-3xl object-top"
                        />
                      </div>
                    </div>

                    {/* ── Courtyard / Territory ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-4 text-[#151719]">
                        {t("detail.territory")}
                      </h4>
                      <p className="text-gray-500 mb-8 text-base max-w-2xl">
                        {t("detail.territoryDesc")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <img loading="lazy" decoding="async"
                          src="/images/orion/new-courtyard-walkway.webp"
                          alt="Детская площадка"
                          className="w-full h-64 sm:h-80 object-cover rounded-3xl"
                        />
                        <img loading="lazy" decoding="async"
                          src="/images/orion/new-playground.webp"
                          alt="Дворовая зона отдыха"
                          className="w-full h-64 sm:h-80 object-cover rounded-3xl"
                        />
                      </div>
                    </div>

                    {/* ── Location ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-4 text-[#151719]">
                        {t("detail.location")}
                      </h4>
                      <p className="text-gray-600 mb-6 text-lg">
                        {t("orion.address")}
                      </p>
                      <div className="cursor-zoom-in hover:shadow-lg transition-shadow rounded-3xl overflow-hidden border border-gray-100" onClick={() => setZoomedImage('/images/orion/location-map.webp')}>
                        <img loading="lazy" decoding="async"
                          src="/images/orion/location-map.webp"
                          alt="Карта расположения ORION"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>

                    {/* ── Floor Plan Overview ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.floorPlan")}
                      </h4>
                      <div className="cursor-zoom-in hover:shadow-lg transition-shadow rounded-3xl overflow-hidden border border-gray-100" onClick={() => setZoomedImage('/images/orion/floor-plan-typical.webp')}>
                        <img loading="lazy" decoding="async"
                          src="/images/orion/floor-plan-typical.webp"
                          alt="Типовой этаж 3-15"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>

                    {/* ── Apartment Layouts ── */}
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.layouts")}
                      </h4>

                      {/* 1-room */}
                      <h5 className="text-xl font-medium mb-6 text-[#151719]">{t("detail.1room")}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-51.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-1room-51.webp" alt={t("layout.1room.51")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-59.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-1room-59.webp" alt={t("layout.1room.59")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-58.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-1room-58.webp" alt={t("layout.1room.58")} className="w-full h-auto" />
                        </div>
                      </div>

                      {/* 2-room */}
                      <h5 className="text-xl font-medium mb-6 text-[#151719]">{t("detail.2room")}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-70.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-2room-70.webp" alt={t("layout.2room.70")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-70-5.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-2room-70-5.webp" alt={t("layout.2room.70-5")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-75.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-2room-75.webp" alt={t("layout.2room.75")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-78.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-2room-78.webp" alt={t("layout.2room.78")} className="w-full h-auto" />
                        </div>
                      </div>

                      {/* 3-room */}
                      <h5 className="text-xl font-medium mb-6 text-[#151719]">{t("detail.3room")}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-3room-95.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-3room-95.webp" alt={t("layout.3room.95")} className="w-full h-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-3room-108.webp')}>
                          <img loading="lazy" decoding="async" src="/images/orion/plan-3room-108.webp" alt={t("layout.3room.108")} className="w-full h-auto" />
                        </div>
                      </div>
                    </div>

                    {/* ── Documents ── */}
                    <div className="mb-12">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.documents")}
                      </h4>
                      <ul className="space-y-5">
                        {[
                          { key: "doc.agZaklyuchenie", href: "/documents/ag_zaklyuchenie.pdf#zoom=30", type: "PDF" },
                          { key: "doc.gosEkspertiza", href: "/documents/gos_ekspertiza.pdf#zoom=30", type: "PDF" },
                          { key: "doc.gosAkt", href: "/documents/gos_akt.pdf", type: "PDF" },
                          { key: "doc.presentation", href: "/documents/orion_presentation.pdf", type: "PDF" },
                        ].map((doc, i) => (
                          <li key={i}>
                            <a href={doc.href} target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer">
                              <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-[#151719] group-hover:text-white transition-colors">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  ></path>
                                </svg>
                              </span>
                              <span className="text-[#151719] group-hover:text-gray-500 transition-colors underline decoration-1 underline-offset-4 flex items-center gap-2">
                                {t(doc.key)} <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 no-underline uppercase tracking-wider">{doc.type}</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-center mt-16">
                      <button 
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-5 bg-[#151719] text-white rounded-full hover:bg-black transition-all duration-300 text-sm tracking-wide font-medium hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                      >
                        {t("detail.consultCta")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.section
      id="projects"
      className="relative z-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60, transition: { duration: 0.4 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="boxes-screen"
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }}
            exit={{ opacity: 0, y: "100vh", transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }}
            className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-10"
          >
            {/* Section heading — well above the boxes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              }}
              className="text-center max-w-3xl mx-auto -mt-24 sm:-mt-8 mb-14"
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
                style={{
                  fontWeight: 700,
                  marginBottom: "1rem",
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                {t("projects.heading")}
              </h2>
              <p
                className="text-sm sm:text-base"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 500,
                  textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                }}
              >
                {t("projects.subheading")}
              </p>
            </motion.div>

            {/* 3 Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-3 gap-2 sm:gap-5 w-full max-w-[1060px]"
              style={{ maxWidth: "1060px" }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  onClick={() => {
                    onSelectCategory(category.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group cursor-pointer"
                >
                    <div
                      className="rounded-[1rem] sm:rounded-[1.25rem] flex flex-col justify-between transition-all duration-500 overflow-hidden relative group/inner p-4 sm:p-8 h-[160px] sm:h-[300px]"
                      style={{
                        backgroundColor: "rgba(21, 23, 25, 0.65)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(21, 23, 25, 0.85)";
                      e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(21, 23, 25, 0.65)";
                      e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    {/* Top: title + description */}
                    <div>
                      <h3
                        className="text-xs sm:text-2xl tracking-tight leading-snug"
                        style={{
                          fontWeight: 700,
                          color: "#ffffff",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {category.title}
                      </h3>
                      <p
                        className="hidden sm:block leading-relaxed text-[0.95rem]"
                        style={{
                          color: "rgba(255, 255, 255, 0.65)",
                          fontWeight: 400,
                        }}
                      >
                        {category.description}
                      </p>
                    </div>
                    {/* Bottom: label + arrow */}
                    <div
                      className="flex items-center justify-between"
                      style={{
                        paddingTop: "1.25rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <span
                        className="hidden sm:inline uppercase"
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(255, 255, 255, 0.5)",
                          letterSpacing: "0.15em",
                          fontWeight: 600,
                        }}
                      >
                        {t("projects.open")}
                      </span>
                      <div
                        className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-400 group-hover:border-white/40 mx-auto sm:mx-0"
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "#ffffff",
                        }}
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          /* ── Selected category content ── */
          <motion.div
            key="content-screen"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto w-full flex flex-col xl:flex-row xl:items-start gap-8"
          >
            {/* Sticky Back Button */}
            <div className="sticky top-24 sm:top-28 z-50 flex-shrink-0">
              <button
                onClick={handleBack}
                className="group flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-full hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-[#151719] group-hover:-translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#151719]">
                  {t("projects.back")}
                </span>
              </button>
            </div>

            <div className="w-full max-w-5xl mx-auto xl:mx-0 flex-1">{renderCategoryContent()}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal via Portal */}
      {isMounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {zoomedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImage(null)}
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
              style={{ zIndex: 999999 }}
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={zoomedImage}
                alt="Zoomed floor plan"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  );
}
