import { ExternalLink } from "../components/external-link.tsx";
import { IdentityCard } from "../components/identity-card.tsx";
import { profile } from "../config/site.ts";

export function HomePage() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <a href="/" className="wordmark" aria-label="Jessie Hsieh home">
          Jessie Hsieh
        </a>
        <nav aria-label="Social profiles">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
        </nav>
      </header>
      <IdentityCard />
      <footer className="footer">
        <p>A little corner. A lot of possibility.</p>
        <p>
          © {new Date().getUTCFullYear()} {profile.name}
        </p>
      </footer>
    </div>
  );
}
