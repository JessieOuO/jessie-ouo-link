import { ExternalLink } from "../components/external-link.tsx";
import { FlowerMark } from "../components/flower-mark.tsx";
import { IdentityCard } from "../components/identity-card.tsx";
import { ThemeToggle } from "../components/theme-toggle.tsx";
import { profile } from "../config/site.ts";

export function HomePage() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <a href="/" className="wordmark" aria-label="Jessie Hsieh home">
          <FlowerMark /> jessie
        </a>
        <nav aria-label="More about Jessie">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.blog}>Blog</ExternalLink>
          <ThemeToggle />
        </nav>
      </header>
      <IdentityCard />
      <footer className="footer">
        <p className="footer-greeting">
          <FlowerMark /> Thanks for stopping by.
        </p>
        <p>
          © {new Date().getUTCFullYear()} {profile.name}
        </p>
      </footer>
    </div>
  );
}
