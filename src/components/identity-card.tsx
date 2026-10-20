import { profile } from "../config/site.ts";
import { Arrow } from "./arrow.tsx";
import { ExternalLink } from "./external-link.tsx";
import { OuoIllustration } from "./ouo-illustration.tsx";

export function IdentityCard() {
  return (
    <main id="main" className="card" tabIndex={-1}>
      <div className="card-copy">
        <h1>
          Hi, I’m
          <br />
          Jessie Hsieh.
        </h1>
        <p className="intro">
          Welcome to my little corner of the internet. A place for new connections and a friendly
          hello.
        </p>
        <div className="contact">
          <ExternalLink href={profile.linkedin} className="primary-link">
            Connect on LinkedIn <Arrow />
          </ExternalLink>
          <p className="contact-note">Good conversations start with a hello.</p>
        </div>
      </div>
      <OuoIllustration />
    </main>
  );
}
