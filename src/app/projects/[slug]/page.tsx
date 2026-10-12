import { notFound } from "next/navigation";
import { BmwCaseStudy } from "@/components/BmwCaseStudy";
import { OrangeSkyCase } from "@/components/OrangeSkyCase";
import { ProjectHeroIntro } from "@/components/ProjectHeroIntro";
import { SiteWordmark } from "@/components/SiteWordmark";
import { getProjectPage, type ProjectStoryImage } from "@/lib/project-pages";
import {
  resolveCaseStudyImage,
  resolveProjectImage,
  resolveProjectMark,
} from "@/lib/project-video";

type ProjectRoute = {
  slug: string;
};

const IMAGE_ALT: Record<string, string> = {
  "low-midfi": "Low- and mid-fidelity screens",
  home: "Home page",
  cards: "Cards page",
  card: "Card page",
  hospital: "Hospital page",
  "page-hero": "Travel card on a phone",
};

export function generateStaticParams(): ProjectRoute[] {
  return [{ slug: "airally" }, { slug: "bmw" }, { slug: "orangesky" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectRoute>;
}) {
  const { slug } = await params;
  const page = getProjectPage(slug);

  if (!page) {
    return { title: "SUMATTHEW" };
  }

  return {
    title: `${page.title} — SUMATTHEW`,
    description: page.summary,
  };
}

function ProjectMedia({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="project-media">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
      ) : (
        <span className="project-media-placeholder">Hero image</span>
      )}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<ProjectRoute>;
}) {
  const { slug } = await params;
  const page = getProjectPage(slug);

  if (!page) {
    notFound();
  }

  const featureImage = resolveCaseStudyImage(slug);
  const markImage = resolveProjectMark(slug);
  const storyImageSrc: Record<string, string | undefined> = {
    "low-midfi": resolveProjectImage(slug, /low[- ]?mid/i),
    home: resolveProjectImage(slug, /home\s*page/i),
    cards: resolveProjectImage(slug, /cards\s*page/i),
    card: resolveProjectImage(slug, /card\s*page/i),
    hospital: resolveProjectImage(slug, /hospital\s*page/i),
    "page-hero": resolveProjectImage(slug, /project\s*page\s*hero/i),
  };
  const intro = page.sections[0];

  return (
    <main className="project-page" data-surface={page.surface}>
      <header className="project-header">
        <SiteWordmark />
        {markImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="project-mark-inline"
            src={markImage}
            alt=""
            aria-hidden="true"
          />
        ) : null}
      </header>

      {page.layout === "orangesky" && (
        <OrangeSkyCase
          heroSrc={resolveProjectImage(slug, /^orangesky\.png$/i)}
          solutionSrc={resolveProjectImage(slug, /solution/i)}
        />
      )}
      {page.layout === "bmw" && (
        <BmwCaseStudy
          coverSrc={resolveProjectImage(slug, /iphone\s*17/i)}
          conceptSrcs={{
            home: resolveProjectImage(slug, /earlyconcept1/i),
            journey: resolveProjectImage(slug, /earlyconcept2/i),
            abHome: resolveProjectImage(slug, /earlyconcept3/i),
            abJourney: resolveProjectImage(slug, /earlyconcept4/i),
          }}
          officialSrcs={{
            home: resolveProjectImage(slug, /^homepageofficial/i),
            journey: resolveProjectImage(slug, /^journeypageofficial/i),
            task: resolveProjectImage(slug, /^taskpageofficial/i),
            me: resolveProjectImage(slug, /^mepageofficial/i),
            discover: resolveProjectImage(slug, /^discoverpageofficial/i),
          }}
          marketingSrcs={{
            shot1: resolveProjectImage(slug, /^bmwmarketing1/i),
            shot2: resolveProjectImage(slug, /^bmwmarketing2/i),
            shot3: resolveProjectImage(slug, /^bmwmarketing3/i),
          }}
        />
      )}
      {page.layout !== "bmw" &&
      page.layout !== "orangesky" &&
      page.hero === false ? (
        <h1 className="intro-sr">{page.title}</h1>
      ) : null}
      {page.layout !== "bmw" &&
      page.layout !== "orangesky" &&
      page.hero !== false ? (
        <section className="project-hero">
          <ProjectHeroIntro
            title={page.title}
            type={page.type}
            theme={page.theme}
            client={page.theme ? undefined : page.client}
          />
          {featureImage ? (
            <ProjectMedia
              src={featureImage}
              alt={`${page.title} product screens`}
            />
          ) : null}
        </section>
      ) : null}

      {intro ? (
        <section className="project-intro">
          <h2>{intro.heading}</h2>
          <div className="project-story-body">
            <p>{intro.body}</p>
          </div>
        </section>
      ) : null}

      {page.story?.map((block, index) => {
        const imageKeys = block.images ?? (block.image ? [block.image] : []);
        const images = imageKeys
          .map((key) => ({
            key,
            src: storyImageSrc[key],
            alt: `${page.title} ${IMAGE_ALT[key] ?? key}`,
          }))
          .filter(
            (
              image,
            ): image is {
              key: ProjectStoryImage;
              src: string;
              alt: string;
            } => Boolean(image.src),
          );
        const layout =
          images.length > 1
            ? "pair"
            : images.length === 1
              ? "figure"
              : block.items?.length
                ? "grid"
                : "copy";

        return (
          <section
            key={block.heading ?? imageKeys.join("-") ?? String(index)}
            className="project-story"
            data-layout={layout}
            data-bare={block.heading ? undefined : "on"}
          >
            {block.heading ? <h2>{block.heading}</h2> : null}
            {images.length > 1 ? (
              <div
                className="project-story-images"
                data-count={String(images.length)}
              >
                {images.map((image) => (
                  <ProjectMedia
                    key={image.key}
                    src={image.src}
                    alt={image.alt}
                  />
                ))}
              </div>
            ) : null}
            {images.length === 1 ||
            block.paragraphs?.length ||
            block.items?.length ? (
            <div className="project-story-body">
              {images.length === 1 ? (
                <ProjectMedia src={images[0].src} alt={images[0].alt} />
              ) : null}
              {block.paragraphs?.length ? (
                <div className="project-story-copy">
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {block.items?.length ? (
                <div
                  className="project-story-items"
                  data-count={String(block.items.length)}
                >
                  {block.items.map((item) => (
                    <div key={item.heading} className="project-story-item">
                      <h3>{item.heading}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            ) : null}
          </section>
        );
      })}
    </main>
  );
}
