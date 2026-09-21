"use client";

import { useRef, type PointerEvent } from "react";

type DocumentCardProps = {
  className: string;
  eyebrow: string;
  title: string;
  tone: "passport" | "certificate" | "permit";
};

function DocumentCard({
  className,
  eyebrow,
  title,
  tone,
}: DocumentCardProps) {
  return (
    <div className={`landing-document ${className}`} data-tone={tone}>
      <span className="landing-document-eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <span className="landing-document-rule" />
      <span className="landing-document-rule landing-document-rule-short" />
      <span className="landing-document-seal" aria-hidden="true" />
    </div>
  );
}

export function GlobeScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return;

    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    scene.style.setProperty("--scene-y", `${x * 5}deg`);
    scene.style.setProperty("--scene-x", `${y * -5}deg`);
  }

  function resetPointer() {
    sceneRef.current?.style.setProperty("--scene-y", "0deg");
    sceneRef.current?.style.setProperty("--scene-x", "0deg");
  }

  return (
    <div
      className="landing-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-hidden="true"
    >
      <div className="landing-scene-inner" ref={sceneRef}>
        <div className="landing-scene-halo" />

        <div className="landing-globe-wrap">
          <svg className="landing-globe" viewBox="0 0 520 520">
            <defs>
              <radialGradient id="atlas-ocean" cx="32%" cy="24%" r="72%">
                <stop offset="0%" stopColor="#b9d7ff" />
                <stop offset="38%" stopColor="#5a92d7" />
                <stop offset="76%" stopColor="#24517f" />
                <stop offset="100%" stopColor="#102f51" />
              </radialGradient>
              <linearGradient id="atlas-land" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8efe6" />
                <stop offset="100%" stopColor="#91b69f" />
              </linearGradient>
              <clipPath id="atlas-sphere">
                <circle cx="260" cy="260" r="190" />
              </clipPath>
              <filter id="atlas-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#061525" floodOpacity="0.38" />
              </filter>
            </defs>

            <circle
              cx="260"
              cy="260"
              r="190"
              fill="url(#atlas-ocean)"
              filter="url(#atlas-shadow)"
            />

            <g clipPath="url(#atlas-sphere)" className="landing-globe-grid">
              <ellipse cx="260" cy="260" rx="190" ry="66" />
              <ellipse cx="260" cy="260" rx="190" ry="126" />
              <ellipse cx="260" cy="260" rx="72" ry="190" />
              <ellipse cx="260" cy="260" rx="132" ry="190" />
              <path d="M70 260h380" />
            </g>

            <g clipPath="url(#atlas-sphere)" fill="url(#atlas-land)" opacity="0.93">
              <path d="M115 168c25-38 67-69 108-76 26-4 61 4 71 22 9 17-11 29-29 34-17 5-28 20-41 30-19 15-37 8-50 26-12 17-4 40-20 51-17 12-48 2-63-14-16-18 7-47 24-73Z" />
              <path d="M200 277c17-18 45-20 61-6 14 12 8 31 22 43 9 8 23 8 28 19 7 15-10 30-21 41-20 20-25 61-49 72-21 10-34-30-35-50-1-22-18-37-23-58-5-21 3-45 17-61Z" />
              <path d="M320 140c28-16 77-8 94 18 11 17-2 33-10 47-10 17 8 28 2 45-7 19-35 14-47 27-17 19-8 51-27 68-12 11-36 12-44-3-8-14 6-28 6-43 1-17-15-31-18-48-5-27 19-43 28-66 6-15 1-35 16-45Z" />
              <path d="M375 334c22-16 56-7 67 14 7 14-7 23-17 31-14 11-27 32-45 26-15-5-25-28-20-44 2-10 7-20 15-27Z" />
            </g>

            <circle cx="205" cy="218" r="5" fill="#f8fbff" />
            <circle cx="332" cy="232" r="5" fill="#f8fbff" />
            <path
              d="M205 218c34-48 85-51 127 14"
              fill="none"
              stroke="#f8fbff"
              strokeWidth="2"
              strokeDasharray="5 8"
              opacity="0.84"
            />
            <circle cx="260" cy="260" r="190" fill="none" stroke="#dcecff" strokeOpacity="0.34" strokeWidth="2" />
          </svg>

          <div className="landing-flight-orbit">
            <div className="landing-airplane">
              <svg viewBox="0 0 40 40">
                <path d="m35 18-12-5V5c0-2-1-4-3-4s-3 2-3 4v8L5 18c-2 1-3 2-3 4l15-2v8l-4 3v3l7-2 7 2v-3l-4-3v-8l15 2c0-2-1-3-3-4Z" />
              </svg>
            </div>
          </div>
        </div>

        <DocumentCard
          className="landing-document-one"
          eyebrow="Identity"
          title="Passport"
          tone="passport"
        />
        <DocumentCard
          className="landing-document-two"
          eyebrow="Civil record"
          title="Birth certificate"
          tone="certificate"
        />
        <DocumentCard
          className="landing-document-three"
          eyebrow="Destination"
          title="Residence permit"
          tone="permit"
        />
      </div>
    </div>
  );
}
