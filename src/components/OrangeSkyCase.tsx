import { ORANGE_SKY_CASE } from "@/lib/orangesky-case";

type OrangeSkyCaseProps = {
  heroSrc?: string;
  solutionSrc?: string;
};

export function OrangeSkyCase({ heroSrc, solutionSrc }: OrangeSkyCaseProps) {
  const { title, type, client, lede, research, ideation, concept } =
    ORANGE_SKY_CASE;

  return (
    <article className="os-case">
      <header className="os-open">
        <h1 className="os-title">{title}</h1>
        <dl className="os-meta">
          <div className="os-meta-item">
            <dt>Type</dt>
            <dd>{type}</dd>
          </div>
          <div className="os-meta-item">
            <dt>Client</dt>
            <dd>{client}</dd>
          </div>
        </dl>
      </header>

      {heroSrc ? (
        <figure className="os-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt="Laurie 2.0 Orange Sky laundry van" />
        </figure>
      ) : null}

      <section className="os-chapter" aria-labelledby="os-lede">
        <p className="os-index">{lede.index}</p>
        <div className="os-copy">
          <h2 id="os-lede">{lede.heading}</h2>
          {lede.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="os-chapter" aria-labelledby="os-research">
        <p className="os-index">{research.index}</p>
        <div className="os-copy">
          <h2 id="os-research">{research.heading}</h2>
          <p>{research.body}</p>
          <ul className="os-insights">
            {research.insights.map((insight) => (
              <li key={insight}>{insight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="os-chapter" aria-labelledby="os-ideation">
        <p className="os-index">{ideation.index}</p>
        <div className="os-copy">
          <h2 id="os-ideation">{ideation.heading}</h2>
          <p>{ideation.body}</p>
        </div>
      </section>

      <section className="os-chapter" aria-labelledby="os-concept">
        <p className="os-index">{concept.index}</p>
        <div className="os-copy">
          <h2 id="os-concept">{concept.heading}</h2>
          <p>{concept.body}</p>
          {solutionSrc ? (
            <figure className="os-solution">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={solutionSrc}
                alt="Greywater from Orange Sky vans redirected to community gardens"
              />
            </figure>
          ) : null}
        </div>
      </section>
    </article>
  );
}
