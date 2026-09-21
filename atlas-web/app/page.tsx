import Link from "next/link";
import { GlobeScene } from "@/app/components/landing/GlobeScene";
import { LandingHeader } from "@/app/components/landing/LandingHeader";
import { LandingJourney } from "@/app/components/landing/LandingJourney";

const TRUST_PILLARS = [
  {
    number: "01",
    title: "Clarity before complexity",
    body: "The interface prioritizes what you need now, with deeper explanations available when you want them.",
  },
  {
    number: "02",
    title: "Trust before automation",
    body: "Atlas is designed to connect important guidance to current official sources and show uncertainty honestly.",
  },
  {
    number: "03",
    title: "Progress without pressure",
    body: "No fear, false urgency, or engagement tricks — only useful milestones, reminders, and next actions.",
  },
];

export default function LandingPage() {
  return (
    <main className="atlas-landing">
      <LandingHeader />

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">
            <span aria-hidden="true" />
            Atlas Immigration
          </p>
          <h1 id="landing-title">
            Moving countries is complex.
            <span>Knowing what comes next shouldn’t be.</span>
          </h1>
          <p className="landing-hero-intro">
            Atlas turns scattered requirements, documents, and deadlines into
            one calm journey — built around your situation and your next
            meaningful step.
          </p>

          <div className="landing-hero-actions">
            <a
              className="landing-button landing-button-primary"
              href="#how-atlas-works"
            >
              See how Atlas guides you
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              className="landing-button landing-button-quiet"
              href="/overview"
            >
              Open product preview
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <dl className="landing-hero-principles">
            <div>
              <dt>Designed for</dt>
              <dd>Real journeys</dd>
            </div>
            <div>
              <dt>Built around</dt>
              <dd>Verified guidance</dd>
            </div>
            <div>
              <dt>Always answers</dt>
              <dd>What comes next?</dd>
            </div>
          </dl>
        </div>

        <GlobeScene />

        <p className="landing-scroll-cue" aria-hidden="true">
          Scroll to begin
          <span />
        </p>
      </section>

      <LandingJourney />

      <section
        className="landing-trust"
        id="trust"
        aria-labelledby="trust-title"
      >
        <div className="landing-trust-heading">
          <p className="landing-section-kicker">Built for trust</p>
          <h2 id="trust-title">Guidance should make life feel lighter.</h2>
          <p>
            Immigration decisions carry real consequences. Atlas is being
            designed to communicate with restraint, transparency, and respect.
          </p>
        </div>

        <div className="landing-trust-grid">
          {TRUST_PILLARS.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="landing-final-cta"
        aria-labelledby="final-cta-title"
      >
        <div className="landing-final-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="landing-section-kicker">Atlas</p>
        <h2 id="final-cta-title">Your immigration journey, understood.</h2>
        <p>
          Explore the current product preview and see how Atlas keeps progress,
          tasks, deadlines, and explanations in one calm place.
        </p>
        <Link
          className="landing-button landing-button-light"
          href="/overview"
        >
          Explore the dashboard preview
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="landing-footer">
        <Link className="landing-brand" href="/" aria-label="Atlas home">
          <span className="landing-brand-mark" aria-hidden="true">
            A
          </span>
          <span>Atlas</span>
        </Link>
        <p>Guiding new beginnings with clarity and care.</p>
        <span>Product preview · 2026</span>
      </footer>
    </main>
  );
}
