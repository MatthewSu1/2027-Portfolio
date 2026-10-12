import { BmwHoldVideo } from "@/components/BmwHoldVideo";
import { BMW_CASE } from "@/lib/bmw-case";

function bmwId(heading: string) {
  return `bmw-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

type ConceptSrcKey = "home" | "journey" | "abHome" | "abJourney";
type OfficialSrcKey = "home" | "journey" | "task" | "me" | "discover";
type MarketingSrcKey = "shot1" | "shot2" | "shot3";

type BmwCaseStudyProps = {
  coverSrc?: string;
  conceptSrcs?: Partial<Record<ConceptSrcKey, string>>;
  officialSrcs?: Partial<Record<OfficialSrcKey, string>>;
  marketingSrcs?: Partial<Record<MarketingSrcKey, string>>;
};

export function BmwCaseStudy({
  coverSrc,
  conceptSrcs = {},
  officialSrcs = {},
  marketingSrcs = {},
}: BmwCaseStudyProps) {
  const {
    title,
    meta,
    challenge,
    research,
    opportunity,
    companion,
    concepts,
    final,
    marketing,
    reflection,
  } = BMW_CASE;

  return (
    <article className="bmw-case">
      <header className="bmw-case-open">
        <h1 className="bmw-case-title">{title}</h1>
        <dl className="bmw-case-meta">
          {meta.map((item) => (
            <div key={item.label} className="bmw-case-meta-item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {coverSrc ? (
        <figure className="bmw-case-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverSrc} alt="BMW Passport on iPhone 17" />
        </figure>
      ) : null}

      <section
        id={bmwId(challenge.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{challenge.index}</p>
        <div className="bmw-case-copy">
          <h2>{challenge.heading}</h2>
          {challenge.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section
        id={bmwId(research.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{research.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{research.heading}</h2>
          <div className="bmw-case-split">
            <div className="bmw-case-block">
              <h3>{research.interviews.heading}</h3>
              <ul className="bmw-case-facts">
                {research.interviews.items.map((item) => (
                  <li key={item.title}>
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bmw-case-block">
              <h3>{research.personas.heading}</h3>
              <ul className="bmw-case-personas">
                {research.personas.items.map((item) => (
                  <li key={item.name}>
                    <p>{item.name}</p>
                    <p>{item.quote}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bmw-case-block bmw-case-outcomes-block">
            <h3>{research.outcomes.heading}</h3>
            <ol className="bmw-case-cards bmw-case-outcomes">
              {research.outcomes.items.map((item) => (
                <li key={item.index} className="bmw-case-card">
                  <p className="bmw-case-card-index">{item.index}</p>
                  <h4>{item.heading}</h4>
                  <p>{item.body}</p>
                  <p className="bmw-case-quote">Insight: {item.insight}</p>
                  <p className="bmw-case-answer">Leads to: {item.leadsTo}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id={bmwId(opportunity.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{opportunity.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{opportunity.heading}</h2>
          <ol className="bmw-case-cards">
            {opportunity.items.map((item) => (
              <li key={item.index} className="bmw-case-card">
                <p className="bmw-case-card-index">{item.index}</p>
                <p>{item.body}</p>
                <p className="bmw-case-quote">{item.quote}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id={bmwId(companion.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{companion.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{companion.heading}</h2>
          <ol className="bmw-case-cards">
            {companion.items.map((item) => (
              <li key={item.index} className="bmw-case-card">
                <p className="bmw-case-card-index">{item.index}</p>
                <h3>{item.heading}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point.slice(0, 40)}>{point}</li>
                  ))}
                </ul>
                <p className="bmw-case-answer">Answers: {item.answers}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id={bmwId(concepts.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{concepts.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{concepts.heading}</h2>
          {concepts.groups.map((group) => {
            const stills = group.items.filter(
              (item) => conceptSrcs[item.srcKey],
            );

            if (stills.length === 0) {
              return null;
            }

            return (
              <div key={group.heading} className="bmw-case-concept-group">
                <h3>{group.heading}</h3>
                <div className="bmw-case-stills">
                  {stills.map((item) => (
                    <figure key={item.srcKey} className="bmw-case-still">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={conceptSrcs[item.srcKey]}
                        alt={`${item.label}, ${group.heading.toLowerCase()}`}
                      />
                      <figcaption>{item.label}</figcaption>
                    </figure>
                  ))}
                </div>
                {"findings" in group && group.findings ? (
                  <div className="bmw-case-findings">
                    {group.findings.map((finding) => (
                      <div key={finding.label} className="bmw-case-finding">
                        <h4>{finding.label}</h4>
                        {finding.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section
        id={bmwId(final.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{final.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{final.heading}</h2>
          {(() => {
            const stills = final.group.items.filter(
              (item) => officialSrcs[item.srcKey],
            );

            if (stills.length === 0) {
              return null;
            }

            return (
              <div className="bmw-case-concept-group">
                <h3>{final.group.heading}</h3>
                <div className="bmw-case-stills">
                  {stills.map((item) => (
                    <figure key={item.srcKey} className="bmw-case-still">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={officialSrcs[item.srcKey]}
                        alt={`${item.label}, official wireframe`}
                      />
                      <figcaption>{item.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <section
        id={bmwId(marketing.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{marketing.index}</p>
        <div className="bmw-case-copy bmw-case-wide">
          <h2>{marketing.heading}</h2>
          {(() => {
            const shots = marketing.items.filter(
              (item) => marketingSrcs[item.srcKey],
            );

            if (shots.length === 0) {
              return null;
            }

            return (
              <div className="bmw-case-stills bmw-case-marketing">
                {shots.map((item) => {
                  const src = marketingSrcs[item.srcKey];

                  if (!src) {
                    return null;
                  }

                  return (
                    <figure key={item.srcKey} className="bmw-case-still">
                      {item.kind === "video" ? (
                        <BmwHoldVideo src={src} label={item.label} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={item.label} />
                      )}
                      <figcaption>{item.label}</figcaption>
                    </figure>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      <section
        id={bmwId(reflection.heading)}
        className="bmw-case-chapter"
      >
        <p className="bmw-case-index">{reflection.index}</p>
        <div className="bmw-case-copy">
          <h2>{reflection.heading}</h2>
          <p>{reflection.chosen}</p>
          <div className="bmw-case-reflection">
            {reflection.parts.map((part) => (
              <div key={part.heading} className="bmw-case-block">
                <h3>{part.heading}</h3>
                {part.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
