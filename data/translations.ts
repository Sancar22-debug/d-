// ============================================
// DOMINANT+ — Translations (RU / EN / KG)
// ============================================

export type Lang = "RU" | "EN" | "KG";

export const translations: Record<Lang, Record<string, string>> = {
  RU: {
    // Header nav
    "nav.objects": "Объекты",
    "nav.documents": "Документы",
    "nav.contacts": "Контакты",
    "nav.cta": "Оставить заявку",

    // Hero
    "hero.title": "СТРОИМ\nПРОСТРАНСТВА\nДЛЯ ЖИЗНИ",
    "hero.subtitle":
      "Современные жилые проекты, продуманная архитектура и надежный подход к строительству.",
    "hero.explore": "Смотреть объекты",
    "hero.contact": "Оставить заявку",

    // Project categories
    "projects.heading": "ОБЪЕКТЫ DOMINANT+",
    "projects.subheading": "Выберите категорию объектов компании DOMINANT+.",
    "projects.open": "Открыть",
    "projects.back": "Назад",

    "cat.completed.title": "Наши объекты",
    "cat.completed.desc":
      "Реализованные и представленные проекты компании DOMINANT+.",
    "cat.building.title": "Строящиеся объекты",
    "cat.building.desc":
      "Актуальные проекты компании на стадии строительства.",
    "cat.upcoming.title": "Будущие объекты",
    "cat.upcoming.desc":
      "Новые проекты DOMINANT+, которые находятся в развитии.",

    "empty.completed":
      "Скоро здесь появятся реализованные проекты DOMINANT+.",
    "empty.upcoming": "Новые проекты DOMINANT+ находятся в развитии.",

    // Project detail
    "detail.floors": "Этажей",
    "detail.apartments": "Квартир",
    "detail.parking": "Паркинг",
    "detail.ceilings": "Потолки",
    "detail.more": "Подробнее об объекте",
    "detail.about": "О проекте",
    "detail.aboutText":
      "Дом создан для тех, кто ценит комфорт, безопасность и современные архитектурные решения. Продуманные планировки и развитая инфраструктура района делают его идеальным местом для жизни.",
    "detail.advantages": "Ключевые преимущества",
    "detail.exterior": "Экстерьер",
    "detail.territory": "Территория дома",
    "detail.territoryDesc":
      "Во дворе предусмотрена современная спортивная зона с тренажёрами и уютные площадки для детей. Пространство продумано так, чтобы жители могли с комфортом заниматься спортом, проводить разминку или практиковать йогу, а дети — безопасно и активно играть рядом.",
    "detail.location": "Расположение",
    "detail.floorPlan": "Типовой этаж",
    "detail.layouts": "Планировки квартир",
    "detail.1room": "1-комнатные",
    "detail.2room": "2-комнатные",
    "detail.3room": "3-комнатные",
    "detail.documents": "Документы",
    "detail.consultCta": "Оставить заявку на консультацию",

    // ORION project data
    "orion.type": "Жилой дом",
    "orion.class": "Бизнес-класс",
    "orion.location": "Новый центр Бишкека",
    "orion.address": "г. Бишкек, район пересечения переулка Садовый и переулка Гранитный",
    "orion.parking": "Подземный паркинг",
    "orion.ceilingHeight": "3.3 м",
    "orion.description": "ORION — жилой дом бизнес-класса от DOMINANT+ в новом центре Бишкека.",

    // Document titles
    "doc.agZaklyuchenie": "Архитектурно-градостроительное заключение",
    "doc.gosEkspertiza": "Государственная экспертиза",
    "doc.gosAkt": "Государственный акт на земельный участок",
    "doc.presentation": "Презентация проекта ORION",

    // Layout labels
    "layout.1room.51": "1-комнатная 51.5 м²",
    "layout.1room.59": "1-комнатная 59 м²",
    "layout.1room.58": "1-комнатная 58.5 м²",
    "layout.2room.70": "2-комнатная 70 м²",
    "layout.2room.70-5": "2-комнатная 70.5 м²",
    "layout.2room.75": "2-комнатная 75.5 м²",
    "layout.2room.78": "2-комнатная 78 м²",
    "layout.3room.95": "3-комнатная 95 м²",
    "layout.3room.108": "3-комнатная 108.85 м²",

    // Advantages list
    "adv.1": "Современная архитектура",
    "adv.2": "Двухуровневый подземный паркинг",
    "adv.3": "Газовое отопление от собственного котла",
    "adv.4": "Красная книга оформлена на компанию",
    "adv.5": "Колясочная зона",
    "adv.6": "Детская закрытая площадка и воркаут зона",
    "adv.7": "Безбарьерная среда",
    "adv.8": "Центральное водоснабжение, электричество, газ и канализация",
    "adv.9": "3.3 метра потолки",
    "adv.10": "1, 2, 3-комнатные квартиры",
    "adv.11": "Высокоскоростные и бесшумные лифты",
    "adv.12": "Функциональные планировки",
    "adv.13": "Алюминиевые окна 85 серии",
    "adv.14": "Доступ по Face ID",
    "adv.15": "Бронированные входные двери",
    "adv.16": "Система безопасности 24/7",
    "adv.17": "Своя управляющая компания",
    "adv.18": "Шумоизоляция и теплоизоляция",

    // Footer
    "footer.ctaTitle": "Хотите узнать больше об объектах DOMINANT+?",
    "footer.ctaSubtitle":
      "Оставьте заявку, и менеджер свяжется с вами для консультации.",
    "footer.name": "Ваше имя",
    "footer.phone": "Ваш телефон",
    "footer.submit": "Отправить",
    "footer.success": "Заявка успешно отправлена!",
    "footer.brand":
      "Строительная компания, создающая современные жилые проекты в Бишкеке.",
    "footer.tagline":
      "Современная архитектура.\nНадежный подход.\nПространства для жизни.",
    "footer.navTitle": "Навигация",
    "footer.contactsTitle": "Контакты",
    "footer.phoneLabel": "Телефон",
    "footer.addressLabel": "Адрес",
    "footer.address": "Бишкек, Боконбаева 115",
    "footer.docsTitle": "Документы по проектам",
    "footer.copyright": "Все права защищены.",
  },

  EN: {
    // Header nav
    "nav.objects": "Projects",
    "nav.documents": "Documents",
    "nav.contacts": "Contacts",
    "nav.cta": "Get in Touch",

    // Hero
    "hero.title": "BUILDING\nSPACES\nFOR LIVING",
    "hero.subtitle":
      "Modern residential projects, thoughtful architecture, and a reliable approach to construction.",
    "hero.explore": "View Projects",
    "hero.contact": "Get in Touch",

    // Project categories
    "projects.heading": "DOMINANT+ PROJECTS",
    "projects.subheading":
      "Choose a project category from DOMINANT+.",
    "projects.open": "Open",
    "projects.back": "Back",

    "cat.completed.title": "Our Projects",
    "cat.completed.desc":
      "Completed and presented projects by DOMINANT+.",
    "cat.building.title": "Under Construction",
    "cat.building.desc":
      "Current projects by the company under active construction.",
    "cat.upcoming.title": "Upcoming Projects",
    "cat.upcoming.desc":
      "New DOMINANT+ projects currently in development.",

    "empty.completed":
      "Completed DOMINANT+ projects will appear here soon.",
    "empty.upcoming": "New DOMINANT+ projects are in development.",

    // Project detail
    "detail.floors": "Floors",
    "detail.apartments": "Apartments",
    "detail.parking": "Parking",
    "detail.ceilings": "Ceilings",
    "detail.more": "More Details",
    "detail.about": "About the Project",
    "detail.aboutText":
      "This building is designed for those who value comfort, safety, and modern architectural solutions. Well-planned layouts and developed neighborhood infrastructure make it an ideal place to live.",
    "detail.advantages": "Key Advantages",
    "detail.exterior": "Exterior",
    "detail.territory": "Building Grounds",
    "detail.territoryDesc":
      "The courtyard features a modern fitness area with exercise equipment and cozy playgrounds for children. The space is designed so residents can comfortably exercise, warm up, or practice yoga, while children play safely nearby.",
    "detail.location": "Location",
    "detail.floorPlan": "Typical Floor",
    "detail.layouts": "Apartment Layouts",
    "detail.1room": "1-Bedroom",
    "detail.2room": "2-Bedroom",
    "detail.3room": "3-Bedroom",
    "detail.documents": "Documents",
    "detail.consultCta": "Request a Consultation",

    // ORION project data
    "orion.type": "Residential Building",
    "orion.class": "Business Class",
    "orion.location": "New Center of Bishkek",
    "orion.address": "Bishkek, intersection of Sadovyy Lane and Granitnyy Lane",
    "orion.parking": "Underground Parking",
    "orion.ceilingHeight": "3.3 m",
    "orion.description": "ORION — a business-class residential building by DOMINANT+ in the new center of Bishkek.",

    // Document titles
    "doc.agZaklyuchenie": "Architectural and Urban Planning Conclusion",
    "doc.gosEkspertiza": "State Expertise",
    "doc.gosAkt": "State Act for the Land Plot",
    "doc.presentation": "ORION Project Presentation",

    // Layout labels
    "layout.1room.51": "1-Bedroom 51.5 m²",
    "layout.1room.59": "1-Bedroom 59 m²",
    "layout.1room.58": "1-Bedroom 58.5 m²",
    "layout.2room.70": "2-Bedroom 70 m²",
    "layout.2room.70-5": "2-Bedroom 70.5 m²",
    "layout.2room.75": "2-Bedroom 75.5 m²",
    "layout.2room.78": "2-Bedroom 78 m²",
    "layout.3room.95": "3-Bedroom 95 m²",
    "layout.3room.108": "3-Bedroom 108.85 m²",

    // Advantages list
    "adv.1": "Modern Architecture",
    "adv.2": "Two-Level Underground Parking",
    "adv.3": "Gas Heating from Own Boiler",
    "adv.4": "Red Book Registered to the Company",
    "adv.5": "Stroller Area",
    "adv.6": "Enclosed Playground & Workout Zone",
    "adv.7": "Barrier-Free Environment",
    "adv.8": "Central Water, Electricity, Gas & Sewage",
    "adv.9": "3.3 m Ceiling Height",
    "adv.10": "1, 2, 3-Bedroom Apartments",
    "adv.11": "High-Speed Silent Elevators",
    "adv.12": "Functional Layouts",
    "adv.13": "85-Series Aluminum Windows",
    "adv.14": "Face ID Access",
    "adv.15": "Armored Entry Doors",
    "adv.16": "24/7 Security System",
    "adv.17": "Own Management Company",
    "adv.18": "Sound & Heat Insulation",

    // Footer
    "footer.ctaTitle": "Want to learn more about DOMINANT+ projects?",
    "footer.ctaSubtitle":
      "Submit a request, and our manager will contact you for a consultation.",
    "footer.name": "Your name",
    "footer.phone": "Your phone",
    "footer.submit": "Submit",
    "footer.success": "Request submitted successfully!",
    "footer.brand":
      "A construction company creating modern residential projects in Bishkek.",
    "footer.tagline":
      "Modern Architecture.\nReliable Approach.\nSpaces for Living.",
    "footer.navTitle": "Navigation",
    "footer.contactsTitle": "Contacts",
    "footer.phoneLabel": "Phone",
    "footer.addressLabel": "Address",
    "footer.address": "Bishkek, Bokonbaeva 115",
    "footer.docsTitle": "Project Documents",
    "footer.copyright": "All rights reserved.",
  },

  KG: {
    // Header nav
    "nav.objects": "Объекттер",
    "nav.documents": "Документтер",
    "nav.contacts": "Байланыштар",
    "nav.cta": "Арыз калтыруу",

    // Hero
    "hero.title": "ЖАШОО ҮЧҮН\nМЕЙКИНДИК\nКУРАБЫЗ",
    "hero.subtitle":
      "Заманбап турак жай долбоорлору, ойлонулган архитектура жана курулушка ишенимдүү мамиле.",
    "hero.explore": "Объекттерди көрүү",
    "hero.contact": "Арыз калтыруу",

    // Project categories
    "projects.heading": "DOMINANT+ ОБЪЕКТТЕРИ",
    "projects.subheading":
      "DOMINANT+ компаниясынын объект категориясын тандаңыз.",
    "projects.open": "Ачуу",
    "projects.back": "Артка",

    "cat.completed.title": "Биздин объекттер",
    "cat.completed.desc":
      "DOMINANT+ компаниясынын аяктаган жана тааныштырылган долбоорлору.",
    "cat.building.title": "Курулуп жаткан объекттер",
    "cat.building.desc":
      "Компаниянын курулуш стадиясындагы актуалдуу долбоорлору.",
    "cat.upcoming.title": "Келечек объекттер",
    "cat.upcoming.desc":
      "DOMINANT+ компаниясынын өнүгүү стадиясындагы жаңы долбоорлору.",

    "empty.completed":
      "Бул жерде жакында DOMINANT+ компаниясынын аяктаган долбоорлору пайда болот.",
    "empty.upcoming":
      "DOMINANT+ компаниясынын жаңы долбоорлору өнүгүү стадиясында.",

    // Project detail
    "detail.floors": "Кабат",
    "detail.apartments": "Батир",
    "detail.parking": "Паркинг",
    "detail.ceilings": "Шыптар",
    "detail.more": "Объект жөнүндө кеңири",
    "detail.about": "Долбоор жөнүндө",
    "detail.aboutText":
      "Бул үй ыңгайлуулукту, коопсуздукту жана заманбап архитектуралык чечимдерди баалагандар үчүн түзүлгөн. Ойлонулган пландар жана райондун өнүккөн инфраструктурасы аны жашоо үчүн идеалдуу жерге айлантат.",
    "detail.advantages": "Негизги артыкчылыктар",
    "detail.exterior": "Экстерьер",
    "detail.territory": "Үйдүн аймагы",
    "detail.territoryDesc":
      "Короодо тренажёрлор менен заманбап спорт зонасы жана балдар үчүн жайлуу аянтчалар каралган. Мейкиндик тургундар ыңгайлуу спорт менен алектенип, балдар жакын жерде коопсуз ойной алгыдай кылып ойлонулган.",
    "detail.location": "Жайгашкан жери",
    "detail.floorPlan": "Типтүү кабат",
    "detail.layouts": "Батирлердин пландары",
    "detail.1room": "1-бөлмөлүү",
    "detail.2room": "2-бөлмөлүү",
    "detail.3room": "3-бөлмөлүү",
    "detail.documents": "Документтер",
    "detail.consultCta": "Консультация үчүн арыз калтыруу",

    // ORION project data
    "orion.type": "Турак жай",
    "orion.class": "Бизнес-класс",
    "orion.location": "Бишкектин жаңы борбору",
    "orion.address": "Бишкек ш., Садовый көчөсү менен Гранитный көчөсүнүн кесилишинде",
    "orion.parking": "Жер алдындагы паркинг",
    "orion.ceilingHeight": "3.3 м",
    "orion.description": "ORION — DOMINANT+ компаниясынын Бишкектин жаңы борборундагы бизнес-класстагы турак жайы.",

    // Document titles
    "doc.agZaklyuchenie": "Архитектуралык-шаар куруу корутундусу",
    "doc.gosEkspertiza": "Мамлекеттик экспертиза",
    "doc.gosAkt": "Жер участогуна мамлекеттик акт",
    "doc.presentation": "ORION долбоорунун презентациясы",

    // Layout labels
    "layout.1room.51": "1-бөлмөлүү 51.5 м²",
    "layout.1room.59": "1-бөлмөлүү 59 м²",
    "layout.1room.58": "1-бөлмөлүү 58.5 м²",
    "layout.2room.70": "2-бөлмөлүү 70 м²",
    "layout.2room.70-5": "2-бөлмөлүү 70.5 м²",
    "layout.2room.75": "2-бөлмөлүү 75.5 м²",
    "layout.2room.78": "2-бөлмөлүү 78 м²",
    "layout.3room.95": "3-бөлмөлүү 95 м²",
    "layout.3room.108": "3-бөлмөлүү 108.85 м²",

    // Advantages list
    "adv.1": "Заманбап архитектура",
    "adv.2": "Эки деңгээлдүү жер алдындагы паркинг",
    "adv.3": "Өз казанынан газ менен жылытуу",
    "adv.4": "Кызыл китеп компанияга катталган",
    "adv.5": "Коляска зонасы",
    "adv.6": "Жабык балдар аянтчасы жана воркаут зонасы",
    "adv.7": "Тоскоолдуксуз чөйрө",
    "adv.8": "Борбордук суу, электр, газ жана канализация",
    "adv.9": "3.3 метр шыптар",
    "adv.10": "1, 2, 3-бөлмөлүү батирлер",
    "adv.11": "Жогорку ылдамдыктагы үнсүз лифттер",
    "adv.12": "Функционалдуу пландар",
    "adv.13": "85-сериядагы алюминий терезелер",
    "adv.14": "Face ID менен кирүү",
    "adv.15": "Бронирленген кирүүчү эшиктер",
    "adv.16": "24/7 коопсуздук системасы",
    "adv.17": "Өз башкаруу компаниясы",
    "adv.18": "Үн жана жылуулук изоляциясы",

    // Footer
    "footer.ctaTitle":
      "DOMINANT+ объекттери жөнүндө көбүрөөк билгиңиз келеби?",
    "footer.ctaSubtitle":
      "Арыз калтырыңыз, менеджер сиз менен консультация үчүн байланышат.",
    "footer.name": "Сиздин атыңыз",
    "footer.phone": "Сиздин телефонуңуз",
    "footer.submit": "Жөнөтүү",
    "footer.success": "Арыз ийгиликтүү жөнөтүлдү!",
    "footer.brand":
      "Бишкекте заманбап турак жай долбоорлорун түзгөн курулуш компаниясы.",
    "footer.tagline":
      "Заманбап архитектура.\nИшенимдүү мамиле.\nЖашоо үчүн мейкиндик.",
    "footer.navTitle": "Навигация",
    "footer.contactsTitle": "Байланыштар",
    "footer.phoneLabel": "Телефон",
    "footer.addressLabel": "Дарек",
    "footer.address": "Бишкек, Боконбаева 115",
    "footer.docsTitle": "Долбоорлор боюнча документтер",
    "footer.copyright": "Бардык укуктар корголгон.",
  },
};
