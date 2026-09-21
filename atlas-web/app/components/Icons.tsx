import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function icon(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function OverviewIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function JourneyIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M4 19c2-6 6-9 8-9s6 3 8 9" />
      <circle cx="12" cy="8" r="2.5" />
    </svg>
  );
}

export function DocumentsIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M8 4h6l4 4v12H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M14 4v4h4" />
      <path d="M10 13h6M10 17h4" />
    </svg>
  );
}

export function DeadlinesIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

export function GuidesIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M5 5h7a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3V5Z" />
      <path d="M12 5h7v14a3 3 0 0 0-3-3h-4" />
    </svg>
  );
}

export function AdvisorIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M4 18V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-5 4v-4Z" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.5 6.5l1.5 1.5M16 16l1.5 1.5M17.5 6.5 16 8M8 16l-1.5 1.5" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M6 9a6 6 0 1 1 12 0c0 7 2 7 2 9H4c0-2 2-2 2-9Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2.5 2.5M14.5 14.5 17 17M17 7l-2.5 2.5M9.5 14.5 7 17" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...icon(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}
