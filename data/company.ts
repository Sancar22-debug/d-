// ============================================
// DOMINANT+ — Company Data
// ============================================

export const company = {
  name: "DOMINANT+",
  description:
    "Строительная компания, создающая современные жилые проекты в Бишкеке.",

  hero: {
    title: "СТРОИМ ПРОСТРАНСТВА ДЛЯ ЖИЗНИ",
    subtitle:
      "Современные жилые проекты, продуманная архитектура и надежный подход к строительству.",
  },

  contacts: {
    phone: "0552 800 500",
    whatsapp: "https://wa.me/996552800500",
    instagram: "https://www.instagram.com/dominant.plus/",
    address: "Бишкек, Боконбаева 115",
  },
};

// --- Main Categories ---

export const mainCategories = [
  {
    id: "completed" as const,
    title: "Наши объекты",
    description: "Реализованные и представленные проекты компании DOMINANT+.",
  },
  {
    id: "building" as const,
    title: "Строящиеся объекты",
    description:
      "Актуальные жилые проекты, находящиеся на стадии строительства.",
  },
  {
    id: "upcoming" as const,
    title: "Будущие объекты",
    description: "Новые проекты компании, которые находятся в развитии.",
  },
];

// --- Navigation ---

export const navigation = [
  { label: "Адрес", href: "#address" },
  { label: "Планировки", href: "#layouts" },
  { label: "Класс", href: "#business" },
  { label: "Контакты", href: "#contact" },
];
