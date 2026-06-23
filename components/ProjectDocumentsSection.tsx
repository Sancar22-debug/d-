"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectDocumentsSection() {
  const { t } = useLanguage();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const documents = [
    { key: "doc.agZaklyuchenie", href: "/documents/ag_zaklyuchenie_page1.webp", type: "IMG" },
    { key: "doc.gosEkspertiza", href: "/documents/gos_ekspertiza_page1.webp", type: "IMG" },
    { key: "doc.reestr", href: "/documents/reestr_page1.webp", type: "IMG" },
    { key: "doc.gosAkt", href: "/documents/gos_akt.pdf", type: "PDF" },
  ];

  return (
    <section id="documents" className="relative z-[2] bg-black pt-16 pb-20 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        {/* Top: Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
            {t("footer.docsTitle")}
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-6"></div>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t("footer.brand")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12"
        >
          {/* QR Code */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shrink-0 shadow-xl">
            <a 
              href="https://minstroy.gov.kg/ru/building/passport/legal/2025002390" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-40 h-40 sm:w-48 sm:h-48 bg-white p-3 sm:p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/images/docs_qr.webp" 
                  alt="QR Code" 
                  fill 
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-center text-gray-400 text-[10px] px-2 -z-10">
                  QR placeholder
                </div>
              </div>
            </a>
          </div>

          {/* Document Images */}
          <div className="flex flex-wrap justify-center gap-6">
            {documents.filter(doc => doc.type === "IMG").map((doc, idx) => (
              <div 
                key={idx} 
                onClick={() => setFullscreenImage(doc.href)}
                className="group cursor-pointer bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all shadow-lg w-[130px] sm:w-[160px]"
              >
                <div className="w-full aspect-[1/1.414] relative bg-[#e8e8e8] p-1">
                  <Image 
                    src={doc.href} 
                    alt={t(doc.key)} 
                    fill 
                    className="object-cover mix-blend-multiply"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-center min-h-[60px] border-t border-white/10">
                  <p className="text-[10px] sm:text-[11px] font-light text-gray-300 group-hover:text-white transition-colors text-center leading-snug">
                    {t(doc.key)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PDF Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex justify-center"
        >
          <ul className="flex flex-col gap-4">
            {documents.filter(doc => doc.type === "PDF").map((doc, idx) => (
              <li key={idx} className="flex justify-center">
                <a 
                  href={doc.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 sm:gap-4 group w-fit"
                >
                  <span className="text-[10px] text-gray-400 bg-white/10 px-2.5 py-1.5 rounded font-bold uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
                    PDF
                  </span>
                  <span className="text-gray-300 group-hover:text-white transition-colors text-base sm:text-lg font-light border-b border-transparent group-hover:border-white/40 pb-0.5 leading-snug">
                    {t(doc.key)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image 
              src={fullscreenImage} 
              alt="Fullscreen Document" 
              fill 
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
