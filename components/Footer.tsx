"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [countryCode, setCountryCode] = useState("+996");
  const [phoneVal, setPhoneVal] = useState("");
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({show: false, type: 'success', message: ''});

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    setPhoneVal(""); // Clear input when country changes
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // strip non-digits

    let formatted = "";
    
    if (countryCode === "+7") {
      // RU/KZ format: (xxx)-xxx-xx-xx (10 digits)
      if (val.length > 10) val = val.slice(0, 10);
      if (val.length > 0) formatted += "(" + val.substring(0, 3);
      if (val.length >= 4) formatted += ")-" + val.substring(3, 6);
      if (val.length >= 7) formatted += "-" + val.substring(6, 8);
      if (val.length >= 9) formatted += "-" + val.substring(8, 10);
    } else if (countryCode === "+998") {
      // UZ format: (xx)-xxx-xx-xx (9 digits)
      if (val.length > 9) val = val.slice(0, 9);
      if (val.length > 0) formatted += "(" + val.substring(0, 2);
      if (val.length >= 3) formatted += ")-" + val.substring(2, 5);
      if (val.length >= 6) formatted += "-" + val.substring(5, 7);
      if (val.length >= 8) formatted += "-" + val.substring(7, 9);
    } else {
      // KG format (+996): (xxx)-xx-xx-xx (9 digits)
      if (val.length > 9) val = val.slice(0, 9);
      if (val.length > 0) formatted += "(" + val.substring(0, 3);
      if (val.length >= 4) formatted += ")-" + val.substring(3, 5);
      if (val.length >= 6) formatted += "-" + val.substring(5, 7);
      if (val.length >= 8) formatted += "-" + val.substring(7, 9);
    }

    setPhoneVal(formatted);
  };

  const getPlaceholder = () => {
    if (countryCode === "+7") return "(xxx)-xxx-xx-xx";
    if (countryCode === "+998") return "(xx)-xxx-xx-xx";
    return "(xxx)-xx-xx-xx";
  };

  const navItems = [
    { label: t("nav.objects"), href: "#projects" },
    { label: t("nav.documents"), href: "#documents" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  return (
    <footer className="relative z-[105] bg-black text-white pt-16 pb-8 border-t border-white/10" id="contact">

      {/* ── CTA Banner ── */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 pb-10 border-b border-white/10">
        <h2 className="text-3xl sm:text-4xl font-light mb-2">
          {t("footer.ctaTitle")}
        </h2>
        <p className="text-gray-400 font-light mb-6">
          {t("footer.ctaSubtitle")}
        </p>

        {/* Form Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <form 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const name = formData.get("name") as string;
              // We don't read countryCode from formData anymore as we have it in state
              const rawPhone = phoneVal.replace(/\D/g, "");
              const fullPhone = `${countryCode}${rawPhone}`;
              
              // Get UTM parameters from URL if present
              const urlParams = new URLSearchParams(window.location.search);
              const utmSource = urlParams.get("utm_source") || "website";
              const utmMedium = urlParams.get("utm_medium") || "";
              const utmCampaign = urlParams.get("utm_campaign") || "";
              const utmTerm = urlParams.get("utm_term") || "";
              const utmContent = urlParams.get("utm_content") || "";

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    fields: {
                      TITLE: `Лид с сайта | ${name} | ${fullPhone}`,
                      NAME: name,
                      PHONE: [{ VALUE: fullPhone, VALUE_TYPE: "WORK" }],
                      UTM_SOURCE: utmSource,
                      UTM_MEDIUM: utmMedium,
                      UTM_CAMPAIGN: utmCampaign,
                      UTM_TERM: utmTerm,
                      UTM_CONTENT: utmContent,
                      COMMENTS: "Лид отправлен с формы в футере сайта"
                    }
                  })
                });
                
                if (response.ok) {
                  setNotification({ show: true, type: 'success', message: t("footer.success") });
                  form.reset();
                  setPhoneVal("");
                } else {
                  throw new Error("API request failed");
                }
              } catch (error) {
                console.error("Error submitting lead:", error);
                setNotification({ show: true, type: 'error', message: t("footer.error") });
              }
            }}
          >
            {/* Name Field - Oval */}
            <input 
              type="text" 
              name="name"
              placeholder={t("footer.name")}
              required
              className="w-full sm:w-[35%] px-5 py-3.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors text-sm font-light"
            />
            
            {/* Phone Field with Country Code - Oval, Bigger */}
            <div className="flex w-full sm:w-[45%] bg-white/5 border border-white/10 rounded-full focus-within:border-white/30 transition-colors">
              <select 
                className="bg-transparent text-white pl-4 pr-2 py-3.5 outline-none text-sm font-light border-r border-white/10 cursor-pointer rounded-l-full appearance-none w-[110px]"
                name="countryCode"
                value={countryCode}
                onChange={handleCountryChange}
              >
                <option value="+996" className="text-black">🇰🇬 +996 (KG)</option>
                <option value="+7" className="text-black">🇷🇺 +7 (RU)</option>
                <option value="+7" className="text-black">🇰🇿 +7 (KZ)</option>
                <option value="+998" className="text-black">🇺🇿 +998 (UZ)</option>
              </select>
              <input 
                type="tel" 
                name="phone"
                placeholder={getPlaceholder()}
                value={phoneVal}
                onChange={handlePhoneChange}
                required
                className="w-full px-4 py-3.5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm font-light rounded-r-full"
              />
            </div>

            {/* Submit Button - Oval */}
            <button
              type="submit"
              className="w-full sm:w-[20%] px-6 py-3.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 text-sm tracking-wide font-bold uppercase shrink-0 cursor-pointer"
            >
              {t("footer.submit")}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Content — 4 balanced columns ── */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-2 lg:flex lg:flex-row justify-between items-start gap-y-12 gap-x-6 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <div className="flex flex-col items-start text-left col-span-2 lg:col-auto">
            <Image
              src="/images/dominant-logo-white.webp"
              alt="DOMINANT+"
              width={150}
              height={28}
              className="mb-4 opacity-90 object-contain"
            />
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-3 max-w-[250px]">
              {t("footer.brand")}
            </p>
            <p className="text-gray-500 text-xs tracking-wider uppercase font-medium leading-loose whitespace-pre-line">
              {t("footer.tagline")}
            </p>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">{t("footer.navTitle")}</h4>
            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Contacts ── */}
          <div className="flex flex-col items-start text-left col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">{t("footer.contactsTitle")}</h4>

            <div className="mb-3">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block mb-1">{t("footer.phoneLabel")}</span>
              <a
                href={`tel:${company.contacts.phone.replace(/\s/g, "")}`}
                className="text-sm text-gray-300 hover:text-white transition-colors font-light"
              >
                {company.contacts.phone}
              </a>
            </div>

            <div className="mb-5">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider block mb-1">{t("footer.addressLabel")}</span>
              <span className="text-sm text-gray-300 font-light">{t("footer.address")}</span>
            </div>

            {/* Socials — Circular */}
            <div className="flex items-center gap-3">
              <a
                href={company.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 hover:-translate-y-0.5 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href={company.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 hover:-translate-y-0.5 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="border-t border-white/10 pt-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500 font-light">
            © {new Date().getFullYear()} DOMINANT+. {t("footer.copyright")}
          </p>
        </div>
      </div>

      {/* ── Notification Toast ── */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:min-w-[320px] z-[200] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl bg-[#0a0a0a] border border-white/5 text-white"
          >
            <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-white/5 text-white">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-light tracking-wide leading-relaxed">{notification.message}</p>
            </div>
            <button 
              type="button"
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="shrink-0 p-1.5 rounded-full text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
