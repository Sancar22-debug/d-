"use client";

import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectDocumentsSection() {
  const { t } = useLanguage();

  const documents = [
    { key: "doc.agZaklyuchenie", href: "/documents/ag_zaklyuchenie.pdf#zoom=30" },
    { key: "doc.gosEkspertiza", href: "/documents/gos_ekspertiza.pdf#zoom=30" },
    { key: "doc.gosAkt", href: "/documents/gos_akt.pdf" },
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
          className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8"
        >
          {/* Left Box: QR Code */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center shrink-0 w-full md:w-[320px] shadow-xl">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/docs_qr.jpg" 
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
            </div>
          </div>

          {/* Right Box: Text and Links */}
          <div className="flex-1 flex flex-col justify-center py-4 sm:py-8 pl-2 md:pl-10">
            <ul className="flex flex-col gap-6 sm:gap-8">
              {documents.map((doc, idx) => (
                <li key={idx} className="flex justify-start">
                  <a 
                    href={doc.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 sm:gap-4 group w-fit"
                  >
                    <span className="text-[10px] text-gray-400 bg-white/10 px-2.5 py-1.5 rounded font-bold uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
                      PDF
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors text-base sm:text-xl font-light border-b border-transparent group-hover:border-white/40 pb-0.5 leading-snug">
                      {t(doc.key)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
