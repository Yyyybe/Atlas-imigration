import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="landing-header">
      <Link className="landing-brand" href="/" aria-label="Atlas home">
        <span className="landing-brand-mark" aria-hidden="true">
          A
        </span>
        <span>Atlas</span>
      </Link>

      <nav className="landing-nav" aria-label="Landing page">
        <a href="#how-atlas-works">How it works</a>
        <a href="#trust">Built for trust</a>
      </nav>

      <Link className="landing-preview-link" href="/overview">
        Dashboard preview
        <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
