import { z } from "zod";

const httpsOrigin = z.url().superRefine((value, context) => {
  if (!URL.canParse(value)) return;
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    context.addIssue({ code: "custom", message: "SITE_URL must be a public HTTPS origin only." });
  }
});

const profileSchema = z.strictObject({
  name: z.string().min(1),
  handle: z.string().min(1),
  description: z.string().min(50).max(160),
  linkedin: z.url({ protocol: /^https$/ }),
  github: z.url({ protocol: /^https$/ }),
});

export const profile = profileSchema.parse({
  name: "Jessie Hsieh",
  handle: "OuO",
  description:
    "The personal home of Jessie Hsieh, also known as OuO. Find my experience on LinkedIn, explore my code on GitHub, and say hello.",
  linkedin: "https://www.linkedin.com/in/jessie-hsieh-ouo",
  github: "https://github.com/JessieOuO",
});

export type SiteConfig = Readonly<{ origin: string | null; indexable: boolean }>;

export function readSiteConfig(
  environment: Record<string, string | undefined>,
  preview = false,
): SiteConfig {
  if (preview) return { origin: null, indexable: false };
  const result = httpsOrigin.safeParse(environment.SITE_URL);
  if (!result.success) {
    throw new Error(
      "Set SITE_URL to your public HTTPS origin (for example, https://your-domain.com). Use --preview for a local, non-indexable build.",
    );
  }
  return { origin: new URL(result.data).origin, indexable: true };
}
