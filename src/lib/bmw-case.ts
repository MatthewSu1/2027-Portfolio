export const BMW_CASE = {
  title: "BMW Passport",
  meta: [
    { label: "Role", value: "Design Lead" },
    { label: "Practice", value: "Product Design / Interaction Designer (UX/UI)" },
    { label: "Span", value: "Research to development" },
    { label: "Client", value: "BMW Group" },
  ],
  challenge: {
    index: "01",
    heading: "The challenge",
    body: [
      "The challenge was to help overseas interns maximise their placement, and to support them emotionally while they did it.",
      "Research showed interns abroad struggled with loneliness and a fear of stepping outside their comfort zone. Practical help only worked if it made the next step feel possible, not heavier.",
      "That meant finding a unique way to help with relocation, translation, culture tips, and notes without overwhelming someone already far from home. Those tools existed in fragments. Stacked together they became another list to manage. The work was to hold them in one place that stayed calm enough to use.",
    ],
  },
  research: {
    index: "02",
    heading: "Research methodology",
    interviews: {
      heading: "Semi-structured interviews",
      items: [
        {
          title: "x4 Overseas internships",
          detail: "2x Software Engineering, 1x Law, 1x Interaction Design",
        },
        {
          title: "x4 Exchange program students",
          detail: "Korea, Japan, Hong Kong and Singapore",
        },
      ],
    },
    personas: {
      heading: "Personas",
      items: [
        {
          name: "The Preparer",
          quote: "I want to feel like I know what I'm doing.",
        },
        {
          name: "The Maximiser",
          quote: "I've made it here. How do I get the most out of it?",
        },
      ],
    },
    outcomes: {
      heading: "Interview outcomes",
      items: [
        {
          index: "01",
          heading: "Loneliness abroad",
          body: "Interns often experienced loneliness or depression away from friends and family. Their emotional state was not healthy.",
          insight:
            "The product had to feel calm and light. Busy screens and stacked tasks would add load to someone already depleted.",
          leadsTo:
            "Interns want structure, guidance, opportunities, but not all at once.",
        },
        {
          index: "02",
          heading: "Outside the comfort zone",
          body: "Overseas experiences were often difficult for interns who struggled to step outside their comfort zone.",
          insight:
            "The next action had to feel small and possible. One clear step is easier to take than a list of things they should be doing.",
          leadsTo: "Overseas experiences are easy to miss.",
        },
        {
          index: "03",
          heading: "Fitting into a new culture",
          body: "Fitting into a new culture was different from anything they already knew. The social rules were unfamiliar, and they were learning them in public.",
          insight:
            "Culture help could not be a generic tip list. It had to come from people who had been there, in a form that felt human.",
          leadsTo: "Students learn from people who have done it.",
        },
      ],
    },
  },
  opportunity: {
    index: "03",
    heading: "Design opportunity",
    items: [
      {
        index: "01",
        body: "Overseas experiences are easy to miss.",
        quote: "A coffee, a name, a weekend in the city",
      },
      {
        index: "02",
        body: "Students learn from people who have done it.",
        quote: "Want advice from past interns or travellers",
      },
      {
        index: "03",
        body: "Interns want structure, guidance, opportunities, but not all at once.",
        quote: "It was overwhelming and there was no clear overview",
      },
    ],
  },
  companion: {
    index: "04",
    heading: "What the digital companion does",
    items: [
      {
        index: "01",
        heading: "Staged journey",
        points: [
          "The internship is split into stages, from Stage 1 Prepare to Stage 6 Connect, so you always know where you are.",
          "Each stage has its own tasks. Complete one and you earn a stamp.",
        ],
        answers: "Overseas experiences are easy to miss",
      },
      {
        index: "02",
        heading: "Voice memos",
        points: [
          "Ability to listen to past interns on their advice and struggles.",
          "Ability to add your own voice memos.",
        ],
        answers: "Want advice from past interns or travellers",
      },
      {
        index: "03",
        heading: "Progress you can see",
        points: [
          "Track your progress on the journey map, on Home and on your profile.",
        ],
        answers: "There was no clear overview",
      },
    ],
  },
  concepts: {
    index: "05",
    heading: "Concept exploration and testing",
    groups: [
      {
        heading: "Initial concepts",
        items: [
          { label: "Home page", srcKey: "home" },
          { label: "Journey page", srcKey: "journey" },
        ],
      },
      {
        heading: "A/B testing",
        items: [
          { label: "Home page", srcKey: "abHome" },
          { label: "Journey page", srcKey: "abJourney" },
        ],
        findings: [
          {
            label: "Home page",
            body: [
              "The quieter home better matched the intern's emotional state. When someone is already anxious or far from home, a minimal layout is more useful than a visually rich one.",
              "The hero image added visual noise with little return. It competed with the next action instead of supporting it.",
              "The white stamp banner sat at the same weight as the cards around it. Progress needed stronger hierarchy so stamps read as achievement, not another content block.",
            ],
          },
          {
            label: "Journey page",
            body: [
              "Both journey maps failed the same test. Neither gave a sense of scale or achievement. You could see the current stage, but not how far you had come or how much of the placement was still ahead.",
            ],
          },
        ],
      },
    ],
  },
  final: {
    index: "06",
    heading: "Final concept",
    group: {
      heading: "Official wireframes",
      items: [
        { label: "Home page", srcKey: "home" },
        { label: "Journey page", srcKey: "journey" },
        { label: "Task page", srcKey: "task" },
        { label: "Me page", srcKey: "me" },
        { label: "Discover page", srcKey: "discover" },
      ],
    },
  },
  marketing: {
    index: "07",
    heading: "Visual marketing",
    items: [
      { label: "Marketing 1", srcKey: "shot1", kind: "image" },
      { label: "Marketing 2", srcKey: "shot2", kind: "video" },
      { label: "Marketing 3", srcKey: "shot3", kind: "video" },
    ],
  },
  reflection: {
    index: "08",
    heading: "BMW Group + QUT Design Academy: Project Reflection",
    chosen: "Chosen Project: Digital Companion Interaction Design",
    parts: [
      {
        heading: "What I LIKED",
        body: [
          "What I liked most about the project was the problem itself. Having personally experienced going abroad for exchange programs, and having experience across Software Engineering and Interaction Design, I could relate to many of the challenges interns face when entering an unfamiliar environment. The emotional challenges of travelling abroad, building new connections and stepping outside of a comfort zone made this a problem I genuinely cared about solving. I also enjoyed the independence of taking the project from initial research through to the final concept and being able to make decisions throughout the design process.",
        ],
      },
      {
        heading: "What I LEARNED",
        body: [
          "Coming from a technical background, my initial instinct when thinking about a “digital companion” was to immediately consider an app or website. This project reminded me that, as an Interaction Designer, the interaction itself can take many forms, whether that is through a mobile application, vehicle interface, interactive environment or physical product. Although my final solution was a mobile application, I became more conscious of focusing on the interactions and user journey rather than simply designing screens or adding functionality.",
          "The project also taught me the importance of structure and planning when working independently. From research and ideation through to concept development, iteration and finalisation, there are many stages that users never see. This process reinforced that strong design is not just about the final product, but the research and decisions that lead to it.",
        ],
      },
      {
        heading: "What I LACK",
        body: [
          "One area I want to improve is exploring concepts beyond solutions that I already understand technically. My Software Engineering background can naturally influence me towards what I know is feasible to build, which can limit my thinking during early ideation. In future projects, I want to explore a wider range of concepts before considering technical constraints. I also want to become more confident in testing and presenting unfinished ideas earlier, using feedback to challenge my assumptions rather than becoming attached to an initial concept.",
        ],
      },
      {
        heading: "What I LONG FOR",
        body: [
          "This experience reinforced my goal of working at the intersection of technology and Interaction Design. I want to become a designer who understands both how a product is built and, more importantly, how people experience it. The BMW Group + QUT Design Academy has helped me develop greater independence, strengthen my design process and better understand the expectations of working in an industry environment. I would strongly recommend the unit to future students because it provides a valuable opportunity to work on a real design problem, receive industry feedback and develop a more practical understanding of the design profession.",
        ],
      },
    ],
  },
} as const;
