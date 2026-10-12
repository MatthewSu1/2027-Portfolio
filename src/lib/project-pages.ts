export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectStoryImage =
  | "low-midfi"
  | "home"
  | "cards"
  | "card"
  | "hospital"
  | "page-hero";

export type ProjectStoryBlock = {
  heading?: string;
  paragraphs?: string[];
  items?: ProjectSection[];
  image?: ProjectStoryImage;
  images?: ProjectStoryImage[];
};

export type ProjectPage = {
  slug: string;
  title: string;
  type: string;
  client: string;
  theme?: string;
  surface?: "dark" | "orangesky";
  enter?: "rise";
  hero?: boolean;
  layout?: "bmw" | "orangesky";
  summary: string;
  sections: ProjectSection[];
  story?: ProjectStoryBlock[];
};

export const PROJECT_PAGES: Record<string, ProjectPage> = {
  airally: {
    slug: "airally",
    title: "AirAlly",
    type: "Product Design & Interaction Design (UX / UI)",
    client: "Design Health Innovation",
    theme: "Health Innovation",
    summary: "Empowering Individuals with allergies overseas",
    sections: [
      {
        heading: "Personal Motivation",
        body: "I’ve lived with allergies my entire life to eggs, nuts, and seafood, which at times felt like almost everything. As I grew older, my love for travel grew too, but so did the challenges. Visiting new countries and trying unfamiliar foods often came with constant anxiety: double-checking translations, relying on friends to confirm ingredients, and never feeling completely certain about what was safe to eat. Traveling something meant to bring freedom and joy instead became an exercise in caution and fear.",
      },
    ],
    story: [
      {
        heading: "The Problem",
        paragraphs: [
          "Traveling with allergies presents serious health and wellbeing challenges. Individuals with food or environmental allergies often face unpredictable situations, unfamiliar cuisines, unclear food labelling, language barriers, and inconsistent healthcare systems. A simple miscommunication or lack of awareness can lead to severe allergic reactions, hospital visits, or even life-threatening emergencies.",
          "Current solutions such as SelectWisely, Equal Eats (translation cards), Google Translate, note-taking apps, and medical alert bracelets are fragmented, reactive, and lack integration. Which one do we really trust? Should we use Google Translate instead? Travelers must rely on multiple disconnected tools that provide limited context or support in real-time scenarios. This creates stress, fear, and avoidance of certain travel experiences.",
          "The lack of an integrated, user-friendly digital health tool designed for allergy management during travel results in reduced autonomy and decreased confidence among allergy sufferers, negatively impacting both physical health and emotional wellbeing. There is a clear opportunity to apply human-centred design and digital health innovation to create a solution that simplifies allergy management, improves cross-cultural communication, and empowers travellers to feel safe and supported worldwide.",
        ],
      },
      {
        image: "page-hero",
      },
      {
        heading: "Design Objectives",
        items: [
          {
            heading: "Enhance Safety and Trust",
            body: "Provide a reliable and accurate platform for managing and communicating allergy information in multiple languages, reducing miscommunication and health risks.",
          },
          {
            heading: "Facilitate Cross-Cultural Communication",
            body: "Bridge language and cultural gaps through intuitive translation features, allergy icons, and culturally adaptable food labelling systems.",
          },
          {
            heading: "Empower Self-Management",
            body: "Enable users to take control of their health through easy access to personalized allergy profiles, medication records, and translation tools.",
          },
        ],
      },
      {
        heading: "Design Decisions",
        image: "low-midfi",
        items: [
          {
            heading: "Home, seen at a glance",
            body: "Quick Access is a grid, not a list, so medical cards, previous scans, and nearby hospitals sit in one view. Under pressure, several key actions are visible at once — without scrolling past them.",
          },
          {
            heading: "Colour as hierarchy",
            body: "Green marks health and reassurance: hospitals, checklists, previous scans. Purple is reserved for Medical Cards, matching the brand. Medical Summary sits at the top. That is the highest-stakes information; errors show up there first, and they are easy to correct.",
          },
          {
            heading: "Finding care nearby",
            body: "The map is a short path to the closest medical centre, with travel options and estimated times. If the user loses their place, Your Location returns them to where they are. Search was added after testing: people did not want to go to certain hospitals.",
          },
          {
            heading: "One native card, then the rest",
            body: "Registered allergy cards are colour-coded and verified by AirAlly. Tap a card for the full view; add a Travel Card below. The original native card stays first, because every translated travel card is built from it.",
          },
        ],
      },
      {
        heading: "Final Outcome",
        images: ["home", "cards", "card", "hospital"],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "Working on AirAlly was incredibly personal. It made me reflect on how design can genuinely change how people feel, not just how they interact. I learned that good health design isn’t only about solving a problem, it’s about easing fear, restoring trust, and giving people confidence in moments that matter.",
          "This project taught me how design can transform lived experience into innovation. What started as a frustration, the anxiety of travelling with allergies became something empowering, not just for me but for others who live with the same daily worries.",
        ],
      },
    ],
  },
  bmw: {
    slug: "bmw",
    title: "BMW Passport",
    type: "Product Design / Interaction Designer (UX/UI) · Design Lead",
    client: "BMW Group",
    surface: "dark",
    enter: "rise",
    hero: false,
    layout: "bmw",
    summary:
      "A digital companion for BMW Group + QUT Design Academy interns, designed and developed end to end.",
    sections: [],
  },
  orangesky: {
    slug: "orangesky",
    title: "OrangeSky Australia",
    type: "QUT Design Intensive",
    client: "Orange Sky Australia",
    surface: "orangesky",
    hero: false,
    layout: "orangesky",
    summary:
      "A QUT design intensive with Orange Sky Australia, proposing plant-safe detergents and greywater irrigation for community gardens.",
    sections: [],
  },
};

export type ProjectMeta = {
  title: string;
  type: string;
  client: string;
  aspect?: "wide";
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export const PROJECT_INDEX: Record<string, ProjectMeta> = {
  bmw: {
    title: "BMW Passport",
    type: "Product Design / Interaction Design (UX/UI)",
    client: "BMW Group",
    aspect: "wide",
    objectPosition: "78% 50%",
  },
  orangesky: {
    title: "OrangeSky Australia",
    type: "QUT Design Intensive",
    client: "Orange Sky Australia",
    aspect: "wide",
  },
  realview: {
    title: "RealView",
    type: "React Web Application, Open AI API",
    client: "Design Capstone",
  },
  whosays: {
    title: "WhoSays",
    type: "Product Design & Interaction Design (UX/UI)",
    client: "Design Health Innovation",
  },
};

export function getProjectPage(slug: string) {
  return PROJECT_PAGES[slug] ?? null;
}

export function getProjectMeta(id: string): ProjectMeta | null {
  const page = PROJECT_PAGES[id];
  const index = PROJECT_INDEX[id];

  if (!page && !index) {
    return null;
  }

  return {
    title: index?.title ?? page?.title ?? id,
    type: index?.type ?? page?.type ?? "Type",
    client: index?.client ?? page?.client ?? "Client",
    aspect: index?.aspect,
    objectFit: index?.objectFit,
    objectPosition: index?.objectPosition,
  };
}

export function projectHref(id: string) {
  return PROJECT_PAGES[id] ? `/projects/${id}` : undefined;
}
