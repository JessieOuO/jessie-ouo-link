import { resolve, sep } from "node:path";
import { outputDirectory } from "../build.ts";

type HeaderRule = { path: string; values: Record<string, string> };

function parseHeaders(source: string): HeaderRule[] {
  const rules: HeaderRule[] = [];
  let rule: HeaderRule | undefined;
  for (const line of source.split("\n")) {
    if (line.startsWith("/")) {
      rule = { path: line.trim(), values: {} };
      rules.push(rule);
    } else if (rule && /^\s+\S/.test(line)) {
      const colon = line.indexOf(":");
      if (colon !== -1) rule.values[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
  }
  return rules;
}

export async function startStaticServer(port = 0) {
  const rules = parseHeaders(await Bun.file(resolve(outputDirectory, "_headers")).text());
  return Bun.serve({
    port,
    hostname: "127.0.0.1",
    async fetch(request) {
      const pathname = new URL(request.url).pathname;
      if (pathname === "/index.html") return Response.redirect(new URL("/", request.url), 308);
      let decoded: string;
      try {
        decoded = decodeURIComponent(pathname);
      } catch {
        return new Response(null, { status: 400 });
      }
      const filePath = resolve(outputDirectory, `.${decoded === "/" ? "/index.html" : decoded}`);
      if (!filePath.startsWith(`${outputDirectory}${sep}`) || decoded.includes("\0")) {
        return new Response(null, { status: 404 });
      }
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
      }
      const file = Bun.file(filePath);
      const exists = await file.exists();
      const body = exists ? file : Bun.file(resolve(outputDirectory, "404.html"));
      const headers = new Headers({ "Content-Type": body.type });
      for (const rule of rules) {
        const matches = rule.path.endsWith("*")
          ? pathname.startsWith(rule.path.slice(0, -1))
          : pathname === rule.path;
        if (matches)
          for (const [name, value] of Object.entries(rule.values)) headers.set(name, value);
      }
      if (!exists) headers.set("X-Robots-Tag", "noindex");
      return new Response(request.method === "HEAD" ? null : body, {
        status: exists ? 200 : 404,
        headers,
      });
    },
  });
}
