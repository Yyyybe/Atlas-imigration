import Link from "next/link";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { useLocale } from "@/app/i18n/LocaleProvider";

export function LandingHeader() {
  const { t } = useLocale();

  return (
    <header className="landing-header">
      <Link className="landing-brand" href="/" aria-label={t("landing.home")}>
        <span className="landing-brand-mark" aria-hidden="true">
          A
        </span>
        <span>Atlas</span>
      </Link>

      <nav className="landing-nav" aria-label={t("header.nav")}>
        <a href="#how-atlas-works">{t("header.how")}</a>
        <a href="#trust">{t("header.trust")}</a>
      </nav>

      <div className="landing-header-actions">
        <LanguageSwitcher tone="dark" />
        <Link className="landing-preview-link" href="/overview">
          {t("header.preview")}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
