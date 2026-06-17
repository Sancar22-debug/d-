// ============================================
// DOMINANT+ — Projects Data
// ============================================

// --- Types ---

export type ProjectStatus = "completed" | "building" | "upcoming";

export interface ProjectLayout {
  area: string;
  type: string;
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
  floors: number;
  apartments: number;
  parking: string;
  ceilingHeight: string;
  description: string;
  image: string;
  layouts: ProjectLayout[];
  advantages: string[];
  documents: ProjectDocument[];
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
    image: "/images/orion-building.webp",
    layouts: [
      { area: "51.5 м²", type: "1-комнатная" },
      { area: "59 м²", type: "1-комнатная" },
      { area: "58.5 м²", type: "1-комнатная" },
      { area: "70 м²", type: "2-комнатная" },
      { area: "70.5 м²", type: "2-комнатная" },
      { area: "75.5 м²", type: "2-комнатная" },
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

export const completedProjects: Project[] = [];

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
