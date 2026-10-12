import { resolveProjectFile } from "@/lib/project-video";

export function AboutField() {
  const hero = resolveProjectFile("airally", /hero\s*video/i);

  return (
    <div className="about-body">
      <header className="about-hero">
        <h1 className="intro-sr">About Me</h1>

        <div className="about-hero-foot">
          <p className="about-bio">
            I&apos;m a Computer Science and Interaction Design student at QUT
            with a passion for creating digital experiences that feel
            intuitive, purposeful, and thoughtfully designed.
          </p>

          <div className="about-hero-kicker">
            {hero ? (
              <video
                className="about-hero-still"
                src={hero}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            ) : null}
            <p className="about-hero-title">
              About
              <br />
              me
            </p>
          </div>
        </div>
      </header>

      <section className="about-chapter" aria-labelledby="about-01">
        <p className="about-index">01.</p>
        <h2 className="about-headline" id="about-01">
          From computer science to <em>designing</em> with people at the
          centre
        </h2>
        <p className="about-label">[Personal story]</p>
        <div className="about-copy">
          <p className="about-lead">Designing with people.</p>
          <p>
            My background sits at the intersection of design and technology.
            Through software development and UX/UI design, I&apos;ve learned to
            approach problems from both sides: understanding how people
            interact with a product and figuring out how to bring that
            experience to life. I&apos;m interested in everything from user
            research and interaction design to front-end development,
            accessibility, and the small details that make a product feel
            right.
          </p>
        </div>
      </section>

      <section className="about-chapter" aria-labelledby="about-02">
        <p className="about-index">02.</p>
        <h2 className="about-headline" id="about-02">
          Industry experience and <em>designing</em> with BMW Group
        </h2>
        <p className="about-label">[Practice]</p>
        <div className="about-copy">
          <p className="about-lead">Design beyond how it looks.</p>
          <p>
            I&apos;ve had the opportunity to apply this approach across
            industry work. These experiences have strengthened my belief that
            good design goes beyond how something looks. It&apos;s about
            understanding people, questioning assumptions, and making complex
            things feel simple.
          </p>
          <div className="about-highlights-block">
            <p className="about-lead">Highlights</p>
            <ul className="about-highlights" aria-label="Industry experience">
              <li>
                <span className="about-highlight-name">Hexagon Mining</span>
                {" - "}
                <span className="about-highlight-role">
                  Software Engineering
                </span>
              </li>
              <li>
                <span className="about-highlight-name">Kitney</span>
                {" - "}
                <span className="about-highlight-role">
                  IT Developer, UX/UI
                </span>
              </li>
              <li>
                <span className="about-highlight-name">BMW Group</span>
                {" - "}
                <span className="about-highlight-role">
                  Interaction Design Intern, QUT
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-chapter" aria-labelledby="about-03">
        <p className="about-index">03.</p>
        <h2 className="about-headline" id="about-03">
          Travel, sports, and <em>running</em> the London Marathon
        </h2>
        <p className="about-label">[Outside of work]</p>
        <div className="about-copy">
          <p className="about-lead">Travel and sport.</p>
          <p>
            Outside of work and study, you&apos;ll usually find me travelling,
            exploring new places, or on the field: touch footy, volleyball, and
            running. I&apos;m an incoming London Marathon runner, running for
            Roy Castle Lung Cancer Foundation. Experiencing different cultures
            has shaped how I see the world and made me more curious about how
            people think, behave, and interact with the things around them.
          </p>
          <p>
            I&apos;m always looking for opportunities to learn, experiment, and
            work with people who care about building meaningful products.
          </p>
          <p>
            Currently interested in: Product design, UX/UI, interaction design,
            and building digital products that bring design and engineering
            together.
          </p>
        </div>
      </section>
    </div>
  );
}
