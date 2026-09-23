"use client";

import { useEffect, useRef, useState } from "react";
import { GlobeScene } from "@/app/components/landing/GlobeScene";
import { useLocale } from "@/app/i18n/LocaleProvider";

export function LandingJourney() {
  const { t } = useLocale();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const steps = [1, 2, 3].map((number) => ({
    number: `0${number}`,
    eyebrow: t(`story.${number}.eyebrow` as "story.1.eyebrow"),
    title: t(`story.${number}.title` as "story.1.title"),
    body: t(`story.${number}.body` as "story.1.body"),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const next = Number((visible.target as HTMLElement).dataset.step);
        if (!Number.isNaN(next)) setActiveStep(next);
      },
      { rootMargin: "-22% 0px -35%", threshold: [0.25, 0.55, 0.8] },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="landing-story" id="how-atlas-works">
      <div className="landing-story-visual">
        <div className="landing-story-status" aria-hidden="true">
          <span>0{activeStep + 1}</span>
          <span className="landing-story-status-line">
            <span style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }} />
          </span>
          <span>03</span>
        </div>

        <div
          className="landing-story-stage landing-story-stage-3d"
          data-active={activeStep}
          aria-hidden="true"
        >
          <div className="story-orbit story-orbit-one" />
          <div className="story-orbit story-orbit-two" />
          <GlobeScene />

          <div className="story-next-step">
            <span>{t("story.next.label")}</span>
            <strong>{t("story.next.title")}</strong>
            <small>{t("story.next.meta")}</small>
          </div>
        </div>
      </div>

      <div className="landing-story-copy">
        <p className="landing-section-kicker">{t("story.kicker")}</p>
        <h2>{t("story.title")}</h2>

        {steps.map((step, index) => (
          <article
            className="landing-story-step"
            data-step={index}
            key={step.number}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
          >
            <span className="landing-story-number">{step.number}</span>
            <p className="landing-story-eyebrow">{step.eyebrow}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
