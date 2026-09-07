import { createHash } from "node:crypto";
import template from "./pages/og/[...slug].png.ts?raw";

// Invalidate generated pages and public image URLs whenever the renderer changes.
export const OG_TEMPLATE_HASH = createHash("sha256")
  .update(template)
  .digest("hex")
  .slice(0, 16);
