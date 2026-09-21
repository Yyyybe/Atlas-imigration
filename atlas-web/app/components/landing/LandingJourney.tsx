"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "01",
    eyebrow: "See the whole picture",
    title: "A move is never just one form.",
    body: "Passports, certificates, appointments, translations, fees, and deadlines all depend on one another. Atlas keeps those details inside one understandable journey.",
  },
  {
    number: "02",
    eyebrow: "Bring order to the details",
    title: "Every document has a reason and a moment.",
    body: "Instead of giving you a generic checklist, Atlas is designed to explain what matters now, what comes later, and why each requirement belongs in your path.",
  },
  {
    number: "03",
    eyebrow: "Keep moving with confidence",
    title: "One clear next step, without the noise.",
    body: "Your progress, current task, deadlines, and explanations stay visible. You can return after days or weeks and immediately understand where you are.",
  },
];

export function LandingJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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
            <span style={{ height: `${((activeStep + 1) / STEPS.length) * 100}%` }} />
          </span>
          <span>03</span>
        </div>

        <div className="landing-story-stage" data-active={activeStep} aria-hidden="true">
          <div className="story-orbit story-orbit-one" />
          <div className="story-orbit story-orbit-two" />

          <div className="story-document story-document-passport">
            <small>Federative Republic</small>
            <strong>Passport</strong>
            <span className="story-passport-mark">◎</span>
          </div>
          <div className="story-document story-document-certificate">
            <small>Civil registry</small>
            <strong>Birth certificate</strong>
            <span className="story-document-lines" />
          </div>
          <div className="story-document story-document-visa">
            <small>Destination</small>
            <strong>Residence permit</strong>
            <span className="story-visa-photo" />
          </div>

          <div className="story-next-step">
            <span>Your next step</span>
            <strong>Verify your document pathway</strong>
            <small>Clear reason · official source · expected timing</small>
          </div>
        </div>
      </div>

      <div className="landing-story-copy">
        <p className="landing-section-kicker">How Atlas works</p>
        <h2>Complexity becomes a journey you can understand.</h2>

        {STEPS.map((step, index) => (
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
