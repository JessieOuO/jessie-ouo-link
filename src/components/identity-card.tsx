import { profile } from "../config/site.ts";
import { Arrow } from "./arrow.tsx";
import { ExternalLink } from "./external-link.tsx";

export function IdentityCard() {
  return (
    <main id="main" className="card" tabIndex={-1}>
      <div className="card-copy">
        <h1>
          Jessie
          <br />
          Hsieh
        </h1>
        <p className="intro">
          A small home on the internet.
          <br />
          My experience, code, and next conversation.
        </p>
        <div className="contact">
          <ExternalLink href={profile.linkedin} className="primary-link">
            Connect on LinkedIn <Arrow />
          </ExternalLink>
          <p className="contact-note">For the work I do, and the things we could do together.</p>
        </div>
      </div>
      <div className="card-signature">
        <span className="signature" role="img" aria-label="Also known as OuO">
          {profile.handle}
        </span>
        <p>
          A familiar face.
          <br />A new connection.
        </p>
      </div>
    </main>
  );
}
