import { buildSite } from "./build.ts";
import { startStaticServer } from "./lib/static-server.ts";

if (!Bun.argv.includes("--production")) await buildSite(true);
const server = await startStaticServer(3000);
console.info(`Local: ${server.url}`);
