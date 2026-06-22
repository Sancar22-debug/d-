"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectStatus, getProjectsByStatus, Project, ProjectDocument } from "@/data/projects";
import { useLanguage } from "./LanguageContext";

interface Props {
  selectedCategory: ProjectStatus | null;
  onSelectCategory: (status: ProjectStatus) => void;
  onBack: () => void;
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25 },
  },
};

const CircularBackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
      >
        <button
          onClick={onClick}
          className="group w-14 h-14 sm:w-[5rem] sm:h-[5rem]"
        style={{
          position: "relative",
          borderRadius: "50%",
          background: "rgba(12, 13, 15, 0.85)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease",
          overflow: "visible",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
          e.currentTarget.style.boxShadow = "0 14px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08) inset";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset";
        }}
      >
        {/* Center arrow circle */}
        <div
          className="w-[2.2rem] h-[2.2rem] sm:w-12 sm:h-12"
          style={{
            position: "relative",
            zIndex: 10,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#151719",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            transition: "background 0.3s ease, transform 0.3s ease",
          }}
        >
          <svg
            style={{ width: "1.25rem", height: "1.25rem", transition: "transform 0.3s ease" }}
            className="group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
      </button>
      </motion.div>
    </div>
  );
};

export default function ProjectCategories({
  selectedCategory,
  onSelectCategory,
  onBack,
}: Props) {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleExpandedProject = (id: string) => {
    setExpandedProjects((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setExpandedProjects([]);
    onBack();
    
    // Use setTimeout to ensure the DOM updates (unmounts project list) before scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        // Offset a bit for any sticky header if needed, but block: "start" is usually fine
        projectsSection.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 10);
  };

  /* ─── Empty state ─── */
  const renderEmptyState = (text: string) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
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
    if (!selectedCategory) return null;
    
    const projects = getProjectsByStatus(selectedCategory);

    if (projects.length === 0) {
      if (selectedCategory === "completed") return renderEmptyState(t("empty.completed"));
      if (selectedCategory === "upcoming") return renderEmptyState(t("empty.upcoming"));
      return renderEmptyState(t("empty.building"));
    }

    return (
      <div className="w-full mt-2 sm:mt-6 mb-12 flex flex-col gap-12 sm:gap-20">
        {projects.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-[0_16px_60px_rgb(0,0,0,0.15)]"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[42%] h-72 sm:h-[450px] lg:h-auto bg-[#f8f9fa] relative p-6 sm:p-10 lg:p-14 flex items-center justify-center">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100">
                  {project.image || (project.gallery && project.gallery.length > 0) ? (
                    <Image
                      src={project.image || (project.gallery ? project.gallery[0] : "")}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm uppercase tracking-widest">{t("detail.noPhoto")}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:w-[58%] p-6 sm:p-10 lg:py-20 lg:px-16 flex flex-col justify-center">
                <span className="text-xs sm:text-sm tracking-wider text-gray-400 uppercase font-semibold mb-3">
                  {t(`${project.id}.type`)} • {t(`${project.id}.class`)}
                </span>
                <h3 className="text-3xl sm:text-5xl font-light mb-6 text-[#151719]">
                  {project.name}
                </h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-base sm:text-lg">
                  {t(`${project.id}.location`)}
                </p>
                <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-12">
                  <div>
                    <span className="block text-2xl sm:text-3xl font-light text-[#151719] mb-2">
                      {project.floors}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                      {project.id === "alaArcha" ? t("detail.perFloor") : t("detail.floors")}
                    </span>
                  </div>
                  {(project.apartments ?? 0) > 0 && (
                  <div>
                    <span className="block text-2xl sm:text-3xl font-light text-[#151719] mb-2">
                      {project.apartments}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.apartments")}
                    </span>
                  </div>
                  )}
                  <div>
                    <span className="block text-lg sm:text-xl font-light text-[#151719] mb-2 leading-tight">
                      {t(`${project.id}.parking`)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                      {project.id === "winchester" ? t("detail.status") : t("detail.parking")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-lg sm:text-xl font-light text-[#151719] mb-2 leading-tight">
                      {t(`${project.id}.ceilingHeight`)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                      {t("detail.ceilings")}
                    </span>
                  </div>
                  {project.id === "alaArcha" && (
                    <>
                      <div>
                        <span className="block text-lg sm:text-xl font-light text-[#151719] mb-2 leading-tight">
                          {t("alaArcha.pso")}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                          {t("detail.pso")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-lg sm:text-xl font-light text-[#151719] mb-2 leading-tight">
                          {t("alaArcha.commissioning")}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                          {t("detail.commissioning")}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {!expandedProjects.includes(project.id) && (
                  <button
                    onClick={() => toggleExpandedProject(project.id)}
                    className="self-start px-7 py-3.5 bg-[#151719] text-white rounded-full hover:bg-black transition-all duration-300 text-[13px] tracking-widest font-semibold hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] cursor-pointer uppercase flex items-center gap-3 group"
                  >
                    {t("detail.more")}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {expandedProjects.includes(project.id) && (
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
                        {t(`${project.id}.description`)} {t("detail.aboutText")}
                      </p>
                    </div>

                    {/* ── Key Advantages ── */}
                    {project.advantages && project.advantages.length > 0 && (
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.advantages")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(project.advantages && project.advantages.length > 0 ? project.advantages : advantages).map((advantage: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 group">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#151719] mt-2.5 opacity-40 group-hover:opacity-100 transition-opacity"></span>
                            <span className="text-gray-700 leading-relaxed">
                              {advantage}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}

                    {/* ── Additional info specific to ORION (or others if added later) ── */}
                    {project.id === "orion" && (
                    <div className="mb-20">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.exterior")}
                          </h4>
                          <div className="h-64 sm:h-96 w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/orion/new-exterior-hero.webp')}>
                            <Image src="/images/orion/new-exterior-hero.webp" alt={t("detail.exterior")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.territory")}
                          </h4>
                          <div className="h-64 sm:h-96 w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/orion/new-courtyard-walkway.webp')}>
                            <Image src="/images/orion/new-courtyard-walkway.webp" alt={t("detail.territory")} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-left">
                        {t("detail.territoryDesc")}
                      </p>
                    </div>
                    )}
                    
                    {/* ── Additional info specific to WINCHESTER ── */}
                    {project.id === "winchester" && (
                    <div className="mb-20">
                      <div className="mb-16">
                        <h4 className="text-3xl font-light mb-6 text-[#151719]">
                          {t("detail.exterior")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                            <Image src="/images/winchester/exterior-1.webp" alt="Экстерьер 1" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                            <Image src="/images/winchester/exterior-2.webp" alt="Экстерьер 2" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                            <Image src="/images/winchester/exterior-3.webp" alt="Экстерьер 3" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.typicalFloor")}
                          </h4>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/winchester/typical-floor.webp')}>
                            <Image src="/images/winchester/typical-floor.webp" alt="Типовой этаж" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <p className="mt-4 text-gray-600 leading-relaxed text-left">
                            {t("winchester.floorPlanDesc")}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.commercial")}
                          </h4>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/winchester/commercial.webp')}>
                            <Image src="/images/winchester/commercial.webp" alt="Коммерческие помещения" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-16">
                        <h4 className="text-3xl font-light mb-6 text-[#151719]">
                          {t("winchester.locationDesc")}
                        </h4>
                        <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                          <Image src="/images/winchester/location-map.webp" alt="Престижное расположение" width={1600} height={900} style={{ width: '100%', height: 'auto' }} />
                        </div>
                      </div>
                    </div>
                    )}
                    
                    {/* ── Additional info specific to ALA ARCHA ── */}
                    {project.id === "alaArcha" && (
                    <div className="mb-20">
                      <div className="mb-16">
                        <h4 className="text-3xl font-light mb-6 text-[#151719]">
                          {t("detail.exterior")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/exterior.webp')}>
                            <Image src="/images/ala-archa/exterior.webp" alt="Экстерьер 1" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/exterior-1.webp')}>
                            <Image src="/images/ala-archa/exterior-1.webp" alt="Экстерьер 2" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/exterior-3.webp')}>
                            <Image src="/images/ala-archa/exterior-3.webp" alt="Экстерьер 3" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/exterior-4.webp')}>
                            <Image src="/images/ala-archa/exterior-4.webp" alt="Экстерьер 4" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.floorPlan")}
                          </h4>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/typical-plan.webp')}>
                            <Image src="/images/ala-archa/typical-plan.webp" alt={t("detail.floorPlan")} width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-3xl font-light mb-6 text-[#151719]">
                            {t("detail.location")}
                          </h4>
                          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage('/images/ala-archa/location.webp')}>
                            <Image src="/images/ala-archa/location.webp" alt={t("detail.location")} width={1000} height={1000} style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                    
                    {/* Gallery for completed projects */}
                    {project.id !== "orion" && project.gallery && project.gallery.length > 0 && (
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">{t("detail.gallery")}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.gallery.map((img: string, idx: number) => (
                          <div key={idx} className="h-64 sm:h-80 w-full relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group" onClick={() => setZoomedImage(img)}>
                            <Image src={img} alt={`${project.name} Gallery ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        ))}
                      </div>
                    </div>
                    )}

                    {/* ── Floor Plans ── */}
                    {project.id === "orion" ? (
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.layouts")}
                      </h4>
                      
                      <div className="mb-12">
                        <h5 className="text-xl font-medium mb-6 text-gray-500 uppercase tracking-widest text-sm border-b border-gray-200 pb-2">
                          {t("detail.1room")}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-51.webp')}>
                            <Image src="/images/orion/plan-1room-51.webp" alt={t("layout.1room.51")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-58.webp')}>
                            <Image src="/images/orion/plan-1room-58.webp" alt={t("layout.1room.58")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-1room-59.webp')}>
                            <Image src="/images/orion/plan-1room-59.webp" alt={t("layout.1room.59")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                        </div>
                      </div>

                      <div className="mb-12">
                        <h5 className="text-xl font-medium mb-6 text-gray-500 uppercase tracking-widest text-sm border-b border-gray-200 pb-2">
                          {t("detail.2room")}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-70.webp')}>
                            <Image src="/images/orion/plan-2room-70.webp" alt={t("layout.2room.70.1")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-70-5.webp')}>
                            <Image src="/images/orion/plan-2room-70-5.webp" alt={t("layout.2room.70.2")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-2room-75.webp')}>
                            <Image src="/images/orion/plan-2room-75.webp" alt={t("layout.2room.75")} width={400} height={400} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                        </div>
                      </div>

                      <div className="mb-12">
                        <h5 className="text-xl font-medium mb-6 text-gray-500 uppercase tracking-widest text-sm border-b border-gray-200 pb-2">
                          {t("detail.3room")}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-3room-95.webp')}>
                            <Image src="/images/orion/plan-3room-95.webp" alt={t("layout.3room.95")} width={600} height={500} sizes="(max-width: 640px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                          <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in" onClick={() => setZoomedImage('/images/orion/plan-3room-108.webp')}>
                            <Image src="/images/orion/plan-3room-108.webp" alt={t("layout.3room.108")} width={600} height={500} sizes="(max-width: 640px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    ) : project.layouts && project.layouts.length > 0 ? (
                    <div className="mb-20">
                      <h4 className="text-3xl font-light mb-8 text-[#151719]">
                        {t("detail.layouts")}
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {project.layouts.map((layout, idx) => (
                          <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                            <h5 className="text-xl font-medium mb-6 text-[#151719] border-b border-gray-200 pb-4">
                              {layout.type} <span className="text-gray-500 ml-2 font-light">{layout.area}</span>
                            </h5>
                            {layout.description && (
                              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                {layout.description}
                              </p>
                            )}
                            {layout.roomsInfo && (
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6">
                                {layout.roomsInfo.map((room, rIdx) => (
                                  <li key={rIdx} className="flex justify-between items-center text-gray-600 text-base border-b border-gray-50 pb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#151719] opacity-40"></span>
                                      <span>{room.name}</span>
                                    </div>
                                    <span className="font-medium text-[#151719]">{room.size} м²</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {layout.image && (
                              <div className="mt-auto bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-zoom-in group border border-gray-100" onClick={() => setZoomedImage(layout.image!)}>
                                <Image src={layout.image} alt={`${layout.type} Plan`} width={600} height={500} sizes="(max-width: 640px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} className="group-hover:scale-105 transition-transform duration-700" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    ) : null}

                    {/* ── Documents ── */}
                    {project.documents && project.documents.length > 0 && (
                    <div className="mb-12 max-w-md">
                      <h4 className="text-2xl font-light mb-6 text-[#151719]">
                        {t("detail.documents")}
                      </h4>
                      <ul className="space-y-3">
                        {project.documents.map((doc: ProjectDocument, i: number) => (
                          <li key={i}>
                            <a href={doc.href} target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer">
                              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#151719] group-hover:text-white transition-colors shrink-0">
                                <svg
                                  className="w-4 h-4"
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
                              <span className="text-sm text-[#151719] group-hover:text-gray-500 transition-colors underline decoration-1 underline-offset-4 flex items-center gap-2">
                                {t(doc.title)} <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-1 py-0.5 no-underline uppercase tracking-wider">{doc.type}</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}

                    <div className="flex justify-center mt-16">
                      <button 
                        onClick={() => {
                          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
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
        ))}
      </div>
    );
  };;

  return (
    <motion.section
      id="projects"
      className="relative z-10"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="boxes-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-10"
            style={{ willChange: "opacity" }}
          >

            {/* Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-3 gap-3 sm:gap-8 w-full max-w-[1200px]"
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
                  className="group cursor-pointer flex flex-col"
                >
                  <div
                    className="rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden relative mb-3 sm:mb-6 border border-white/10 h-56 sm:h-72 md:h-[450px]"
                    style={{
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Image
                      src={
                        category.id === "completed" ? "/images/builded.webp" :
                        category.id === "building" ? "/images/orion/new-exterior-hero.webp" :
                        "/images/upcoming.webp"
                      }
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 right-2 sm:bottom-5 sm:right-5 w-6 h-6 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="px-1 sm:px-2 text-center sm:text-left">
                    <h3 className="text-[16px] xs:text-[18px] sm:text-2xl md:text-3xl tracking-tight text-white mt-1 sm:mt-2" style={{ fontWeight: 700 }}>
                      {category.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          /* ── Selected category content ── */
          <motion.div
            key="content-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="min-h-[105vh] pt-20 sm:pt-24 pb-40 px-4 sm:px-6 lg:px-8 w-full flex flex-col"
            style={{ willChange: "transform, opacity" }}
          >
            {isMounted && typeof document !== "undefined"
              ? createPortal(<CircularBackButton onClick={handleBack} />, document.body)
              : null}

            <div className="w-full max-w-7xl mx-auto my-auto">{renderCategoryContent()}</div>
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
