// ============================================
// DOMINANT+ — Projects Data
// ============================================

// --- Types ---

export type ProjectStatus = "completed" | "building" | "upcoming";

export interface ProjectLayout {
  area: string;
  type: string;
  description?: string;
  roomsInfo?: { name: string; size: string }[];
  image?: string;
}

export interface ProjectDocument {
  title: string;
  href: string;
  type: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  type: string;
  className: string;
  location: string;
  address: string;
  floors?: number;
  apartments?: number;
  parking?: string;
  ceilingHeight?: string;
  description: string;
  image?: string;
  layouts?: ProjectLayout[];
  advantages: string[];
  documents: ProjectDocument[];
  completionDate?: string;
  features?: string[];
  gallery?: string[];
  layoutSizes?: { rooms: number; size: number }[];
  commercialSpaces?: boolean;
}

// ============================================
// Строящиеся объекты
// ============================================

export const buildingProjects: Project[] = [
  {
    id: "orion",
    name: "ORION",
    status: "building",
    type: "Жилой дом",
    className: "Бизнес-класс",
    location: "Новый центр Бишкека",
    address:
      "г. Бишкек, район пересечения переулка Садовый и переулка Гранитный",
    floors: 15,
    apartments: 117,
    parking: "Подземный паркинг",
    ceilingHeight: "3.3 м",
    description:
      "ORION — жилой дом бизнес-класса от DOMINANT+ в новом центре Бишкека.",
    image: "/images/orion/new-exterior-hero.webp",
    gallery: [
      "/images/orion/new-exterior-hero.webp",
      "/images/orion/new-exterior-views.webp",
      "/images/orion/new-exterior-views-2.webp",
      "/images/orion/new-courtyard-walkway.webp",
      "/images/orion/new-playground.webp",
      "/images/orion/new-entrance.webp"
    ],
    layouts: [
      { area: "51.5 м²", type: "1-комнатная", image: "/images/orion/plan-1room-51.webp" },
      { area: "58.5 м²", type: "1-комнатная", image: "/images/orion/plan-1room-58.webp" },
      { area: "59 м²", type: "1-комнатная", image: "/images/orion/plan-1room-59.webp" },
      { area: "70 м²", type: "2-комнатная", image: "/images/orion/plan-2room-70.webp" },
      { area: "70.5 м²", type: "2-комнатная", image: "/images/orion/plan-2room-70-5.webp" },
      { area: "75.5 м²", type: "2-комнатная", image: "/images/orion/plan-2room-75.webp" },
      { area: "78 м²", type: "2-комнатная", image: "/images/orion/plan-2room-78.webp" },
      { area: "95 м²", type: "3-комнатная", image: "/images/orion/plan-3room-95.webp" },
      { area: "108 м²", type: "3-комнатная", image: "/images/orion/plan-3room-108.webp" }
    ],
    advantages: [
      "Бизнес-класс",
      "15 этажей",
      "117 квартир",
      "Подземный паркинг",
      "Потолки 3.3 м",
      "Современная архитектура",
      "Закрытая территория",
      "Детская и спортивная зона",
      "Панорамные окна",
      "Удобная локация",
    ],
    documents: [
      {
        title: "Архитектурно-градостроительное заключение",
        href: "/documents/ag_zaklyuchenie.pdf#zoom=30",
        type: "PDF"
      },
      {
        title: "Государственная экспертиза",
        href: "/documents/gos_ekspertiza.pdf#zoom=30",
        type: "PDF"
      },
      {
        title: "Государственный акт на земельный участок",
        href: "/documents/gos_akt.pdf",
        type: "PDF"
      },
      {
        title: "Презентация проекта ORION",
        href: "/documents/orion_presentation.pdf",
        type: "PDF"
      }
    ],
  },
];

// ============================================
// Наши объекты (сданные)
// ============================================

export const completedProjects: Project[] = [
  {
    id: "winchester",
    name: "WINCHESTER",
    status: "completed",
    type: "Жилой Комплекс",
    className: "Премиум Класс",
    location: "Престижное расположение в золотом квадрате",
    address: "ул. Шопокова / Токтогула, Бишкек",
    floors: 10,
    apartments: 27,
    commercialSpaces: true,
    parking: "Подземный паркинг",
    ceilingHeight: "3.3 м",
    description: "WINCHESTER — премиальный жилой комплекс с уникальной архитектурой и высоким уровнем комфорта.",
    image: "/images/winchester/hero.webp",
    gallery: [
      "/images/winchester/interior-1.webp",
      "/images/winchester/interior-2.webp",
      "/images/winchester/interior-3.webp",
      "/images/winchester/interior-4.webp",
      "/images/winchester/interior-5.webp"
    ],
    layouts: [
      { 
        area: "63.20 м²", 
        type: "1-комнатная",
        image: "/images/winchester/plan-1room.webp",
        roomsInfo: [
          { name: "Холл", size: "8.21" },
          { name: "Душевая", size: "3.65" },
          { name: "Спальня", size: "12.67" },
          { name: "Гостиная", size: "24.38" },
          { name: "Кухня", size: "8.06" },
          { name: "Балкон", size: "6.23" }
        ]
      },
      { 
        area: "78.12 м²", 
        type: "2-комнатная",
        image: "/images/winchester/plan-2room.webp",
        roomsInfo: [
          { name: "Холл", size: "10.38" },
          { name: "Душевая", size: "6.95" },
          { name: "Спальня", size: "14.24" },
          { name: "Гостиная", size: "31.94" },
          { name: "Кухня", size: "10.41" },
          { name: "Балкон", size: "4.20" }
        ]
      },
      { 
        area: "104.34 м²", 
        type: "3-комнатная",
        image: "/images/winchester/plan-3room.webp",
        roomsInfo: [
          { name: "Холл", size: "6.57" },
          { name: "Ванная комната", size: "4.75" },
          { name: "Гостиная", size: "30.71" },
          { name: "Кухня", size: "18.04" },
          { name: "Душевая", size: "3.81" },
          { name: "Балкон", size: "4.66" },
          { name: "Спальня", size: "18.90" },
          { name: "Детская", size: "12.31" },
          { name: "Балкон", size: "4.59" }
        ]
      },
    ],
    advantages: [
      "Межкомнатная шумоизоляция",
      "Высота потолков - 3.3м",
      "Все разрешительные документы",
      "Бесшумные скоростные лифты",
      "Функциональные планировки",
      "Панорамные окна 70 серии",
      "Бронированные входные двери",
      "Центральные коммуникации",
      "Детская площадка",
      "Шаговая доступность",
      "Удобная транспортная развязка",
      "Сдан под ПСО",
    ],
    documents: [
      {
        title: "doc.winchesterPresentation",
        href: "/documents/winchester_presentation.pdf",
        type: "PDF"
      }
    ],
  },
  {
    id: "alaArcha",
    name: "АЛА - АРЧА",
    status: "building",
    type: "Семейный природный кластер",
    className: "Премиум Класс",
    location: "Вдоль реки Ала-Арча",
    address: "Бишкек, Магистраль / Байтик Баатыра",
    completionDate: "4 квартал 2026",
    floors: 7,
    apartments: 26,
    ceilingHeight: "3.5 м",
    description: "Эксклюзивный семейный природный кластер премиум-класса «Ала-Арча». Ваш дом вдали от городского шума, окружённый парками и с прямым видом на горы. Продуманные сквозные планировки обеспечивают обилие света и уникальные видовые характеристики.",
    advantages: [
      "Всего 26 квартир (по 2 на этаже)",
      "Высота потолков — 3.5 метра",
      "Панорамные алюминиевые окна Aliminium Thermo",
      "Фасад — натуральный камень Сары-Таш",
      "Межкомнатная шумоизоляция Knauf акустик",
      "Бесшумные и скоростные лифты",
      "Индивидуальное газовое отопление",
      "Круглогодичная крытая детская площадка",
      "Красная книга и все разрешительные документы"
    ],
    features: [
      "Полностью закрытая территория без машин",
      "Прямой вид на горы и реку",
      "Просторные сквозные планировки",
      "Два эксклюзивных пентхауса с террасами на крыше",
      "Вдали от высотной застройки",
      "20 минут до центра города, 15 минут до парка Азербайджан"
    ],
    image: "/images/ala-archa/hero.webp",
    gallery: [
      "/images/ala-archa/gallery-1.webp",
      "/images/ala-archa/gallery-3.webp",
      "/images/ala-archa/gallery-7.webp",
      "/images/ala-archa/gallery-8.webp",
      "/images/ala-archa/gallery-9.webp",
      "/images/ala-archa/gallery-10.webp"
    ],
    layouts: [
      {
        area: "79 м²",
        type: "2-комнатная",
        image: "/images/ala-archa/plan-2.webp",
        description: "Идеальный вариант для пары или небольшой семьи. Просторная спальня, уютная гостиная и отдельная кухня создают комфортное пространство для жизни. Компактно и функционально — всё, что нужно для удобства.",
        roomsInfo: [
          { name: "1. Холл", size: "8.06" },
          { name: "2. Кухня", size: "13.55" },
          { name: "3. Тех. помещение", size: "2.14" },
          { name: "4. Балкон", size: "1.96" },
          { name: "5. Спальня", size: "19.92" },
          { name: "6. Душевая", size: "3.75" },
          { name: "7. Санузел", size: "1.95" },
          { name: "8. Ванная комната", size: "3.94" },
          { name: "9. Гостиная", size: "23.73" }
        ]
      },
      {
        area: "121 м²",
        type: "3-комнатная",
        image: "/images/ala-archa/plan3.webp",
        description: "Отличный выбор для семьи с детьми. Уютная детская, большая гостиная и родительская спальня с отдельной душевой обеспечивают максимальный комфорт. Планировка продумана для динамичной семейной жизни.",
        roomsInfo: [
          { name: "1. Холл", size: "11.74" },
          { name: "2. Кухня", size: "13.55" },
          { name: "3. Тех. помещение", size: "2.14" },
          { name: "4. Балкон", size: "1.96" },
          { name: "4/2. Балкон", size: "3.20" },
          { name: "5. Спальня", size: "18.43" },
          { name: "6. Душевая", size: "3.90" },
          { name: "7. Санузел", size: "2.51" },
          { name: "8. Ванная комната", size: "6.85" },
          { name: "9. Гостиная", size: "38.83" },
          { name: "10. Детская", size: "17.90" }
        ]
      },
      {
        area: "135 м²",
        type: "3-комнатная",
        image: "/images/ala-archa/plan3l.webp",
        description: "Эта квартира подойдёт для тех, кто ценит простор. Дополнительная гардеробная и увеличенные комнаты делают жильё особенно удобным. Здесь есть место для хранения, уюта и приёма гостей.",
        roomsInfo: [
          { name: "1. Холл", size: "18.74" },
          { name: "2. Кухня", size: "15.29" },
          { name: "3. Тех. помещение", size: "2.16" },
          { name: "4. Балкон", size: "3.83" },
          { name: "4/2. Балкон", size: "3.20" },
          { name: "5. Спальня", size: "19.03" },
          { name: "6. Душевая", size: "7.22" },
          { name: "7. Санузел", size: "2.58" },
          { name: "8. Ванная комната", size: "4.04" },
          { name: "9. Гостиная", size: "30.03" },
          { name: "11. Гардеробная", size: "5.71" },
          { name: "11/2. Общая гардеробная", size: "4.36" },
          { name: "10. Детская", size: "18.81" }
        ]
      },
      {
        area: "174 м²",
        type: "4-комнатная",
        image: "/images/ala-archa/plan-4.webp",
        description: "Формат для большой семьи или тех, кто любит масштаб. Просторные спальни, кабинет для работы, несколько балконов и зона для отдыха. Это уровень комфорта премиум, когда дом становится настоящей крепостью.",
        roomsInfo: [
          { name: "1. Холл", size: "32.96" },
          { name: "2. Кухня", size: "15.29" },
          { name: "3. Тех. помещение", size: "2.16" },
          { name: "4. Балкон", size: "3.83" },
          { name: "4/2. Балкон", size: "3.20" },
          { name: "4/3. Балкон", size: "3.20" },
          { name: "5. Спальня", size: "24.36" },
          { name: "6. Душевая", size: "5.15" },
          { name: "7. Санузел", size: "2.59" },
          { name: "8. Ванная комната", size: "6.06" },
          { name: "9. Гостиная", size: "28.99" },
          { name: "11. Гардеробная", size: "5.36" },
          { name: "12. Кабинет", size: "19.71" },
          { name: "10. Детская", size: "21.14" }
        ]
      }
    ],
    commercialSpaces: true,
    documents: [
      {
        title: "doc.alaArchaPresentation",
        href: "/documents/ala_archa_presentation.pdf",
        type: "PDF"
      }
    ],
  }
];

// ============================================
// Будущие объекты
// ============================================

export const futureProjects: Project[] = [];

// --- Helpers ---

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  switch (status) {
    case "completed":
      return completedProjects;
    case "building":
      return buildingProjects;
    case "upcoming":
      return futureProjects;
  }
}
