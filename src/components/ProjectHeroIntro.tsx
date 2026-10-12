import type { CSSProperties } from "react";

type ProjectHeroIntroProps = {
  title: string;
  type: string;
  theme?: string;
  client?: string;
};

export function ProjectHeroIntro({
  title,
  type,
  theme,
  client,
}: ProjectHeroIntroProps) {
  return (
    <>
      <div className="project-reveal">
        <h1 className="project-title" style={{ "--i": 0 } as CSSProperties}>
          {title}
        </h1>
      </div>
      <div className="project-hero-meta">
        <div className="project-reveal">
          <p style={{ "--i": 1 } as CSSProperties}>
            <span>Type</span>
            {type}
          </p>
        </div>
        {theme ? (
          <div className="project-reveal">
            <p style={{ "--i": 2 } as CSSProperties}>
              <span>Theme</span>
              {theme}
            </p>
          </div>
        ) : client ? (
          <div className="project-reveal">
            <p style={{ "--i": 2 } as CSSProperties}>
              <span>Client</span>
              {client}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
