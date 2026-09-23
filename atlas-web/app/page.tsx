"use client";

import Link from "next/link";
import { GlobeScene } from "@/app/components/landing/GlobeScene";
import { LandingHeader } from "@/app/components/landing/LandingHeader";
import { LandingJourney } from "@/app/components/landing/LandingJourney";
import { useLocale } from "@/app/i18n/LocaleProvider";

export default function LandingPage() {
  const { t } = useLocale();
  const trustPillars = [1, 2, 3].map((number) => ({
    number: `0${number}`,
    title: t(`trust.${number}.title` as "trust.1.title"),
    body: t(`trust.${number}.body` as "trust.1.body"),
  }));

  return (
    <main className="atlas-landing">
      <LandingHeader />

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">
            <span aria-hidden="true" />
            {t("hero.eyebrow")}
          </p>
          <h1 id="landing-title">
            {t("hero.title.first")}
            <span>{t("hero.title.second")}</span>
          </h1>
          <p className="landing-hero-intro">
            {t("hero.intro")}
          </p>

          <div className="landing-hero-actions">
            <a
              className="landing-button landing-button-primary"
              href="#how-atlas-works"
            >
              {t("hero.guide")}
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              className="landing-button landing-button-quiet"
              href="/overview"
            >
              {t("hero.preview")}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <dl className="landing-hero-principles">
            <div>
              <dt>{t("hero.designed")}</dt>
              <dd>{t("hero.designedValue")}</dd>
            </div>
            <div>
              <dt>{t("hero.built")}</dt>
              <dd>{t("hero.builtValue")}</dd>
            </div>
            <div>
              <dt>{t("hero.answers")}</dt>
              <dd>{t("hero.answersValue")}</dd>
            </div>
          </dl>
        </div>

        <GlobeScene />

        <p className="landing-scroll-cue" aria-hidden="true">
          {t("hero.scroll")}
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
          <p className="landing-section-kicker">{t("trust.kicker")}</p>
          <h2 id="trust-title">{t("trust.title")}</h2>
          <p>{t("trust.body")}</p>
        </div>

        <div className="landing-trust-grid">
          {trustPillars.map((pillar) => (
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
        <h2 id="final-cta-title">{t("final.title")}</h2>
        <p>{t("final.body")}</p>
        <Link
          className="landing-button landing-button-light"
          href="/overview"
        >
          {t("final.cta")}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="landing-footer">
        <Link className="landing-brand" href="/" aria-label={t("landing.home")}>
          <span className="landing-brand-mark" aria-hidden="true">
            A
          </span>
          <span>Atlas</span>
        </Link>
        <p>{t("footer.tagline")}</p>
        <span>{t("footer.preview")}</span>
      </footer>
    </main>
  );
}
