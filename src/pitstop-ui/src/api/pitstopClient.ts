import { client } from "./generated/client.gen";

// Use relative URLs so requests go through the Vite dev proxy (dev) or
// the Frontend BFF (production). The generated default points to the raw API
// host, which is only reachable during spec generation.
client.setConfig({ baseURL: "/pitstop" });

export { client };
