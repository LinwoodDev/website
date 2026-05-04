import type { APIContext } from "astro";
import { getCollection, getEntry } from "astro:content";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import sharp from "sharp";
import { getEntryProject, getEntryUrl } from "../../blog";

const WIDTH = 1200;
const HEIGHT = 630;
const CACHE_DIR = new URL("../../../.astro/og-cache/", import.meta.url);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

const mix = (hex: string, target: string, amount: number) => {
  const sourceRgb = hexToRgb(hex);
  const targetRgb = hexToRgb(target);
  const channel = (source: number, destination: number) =>
    Math.round(source + (destination - source) * amount)
      .toString(16)
      .padStart(2, "0");

  return `#${channel(sourceRgb.r, targetRgb.r)}${channel(sourceRgb.g, targetRgb.g)}${channel(sourceRgb.b, targetRgb.b)}`;
};

const logoDataUri = (logo: string) => {
  const file = readFileSync(
    new URL(`../../../public/logos/${logo}.svg`, import.meta.url)
  );
  return `data:image/svg+xml;base64,${file.toString("base64")}`;
};

const wrapText = (text: string, maxChars: number, maxLines: number) => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }

    if (lines.length === maxLines) break;
  }

  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]+$/, "")}...`;
  }

  return lines;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const imageCacheKey = (svgContent: string) =>
  createHash("sha256").update(svgContent).digest("hex");

const renderPng = async (svgContent: string) => {
  const cacheKey = imageCacheKey(svgContent);
  const cacheFile = new URL(`${cacheKey}.png`, CACHE_DIR);

  if (existsSync(cacheFile)) {
    return readFileSync(cacheFile);
  }

  const image = await sharp(Buffer.from(svgContent)).png().toBuffer();
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cacheFile, image);
  return image;
};

const svg = ({
  title,
  date,
  author,
  project,
  logo,
  color,
}: {
  title: string;
  date: Date;
  author: string;
  project?: string;
  logo: string;
  color: string;
}) => {
  const accent = color;
  const deepAccent = mix(accent, "#111820", 0.72);
  const midAccent = mix(accent, "#111820", 0.45);
  const softAccent = mix(accent, "#ffffff", 0.72);
  const logoUri = logoDataUri(logo);
  const titleLines = wrapText(title, 18, 3);
  const projectName = (project ?? "Blog").replace(/^Linwood\s+/i, "");
  const titleSize = titleLines.length > 2 ? 58 : 66;
  const titleLineHeight = titleLines.length > 2 ? 66 : 74;

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#111820"/>
      <stop offset="56%" stop-color="${deepAccent}"/>
      <stop offset="100%" stop-color="${midAccent}"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.44"/>
      <stop offset="58%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="logoShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#000" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <path d="M760 -40C880 112 922 254 884 386C855 488 879 568 956 670H1200V-40H760Z" fill="${accent}" opacity="0.2"/>
  <path d="M906 -40C1008 116 1038 260 996 392C963 497 990 584 1074 670H1200V-40H906Z" fill="${softAccent}" opacity="0.15"/>
  <circle cx="95" cy="542" r="248" fill="${accent}" opacity="0.09"/>
  <image href="${logoUri}" x="774" y="117" width="330" height="330" preserveAspectRatio="xMidYMid meet" filter="url(#logoShadow)" opacity="1"/>
  <text x="96" y="112" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="${accent}">${escapeXml(projectName)}</text>
  <line x1="96" y1="144" x2="246" y2="144" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
  <text x="96" y="250" font-family="Inter, Arial, sans-serif" font-size="${titleSize}" font-weight="950" fill="#ffffff">
    ${titleLines.map((line, index) => `<tspan x="96" dy="${index === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <text x="96" y="520" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="850" fill="#ffffff">${escapeXml(author)}</text>
  <text x="96" y="554" font-family="Inter, Arial, sans-serif" font-size="22" fill="#b7bec9">${escapeXml(formatDate(date))}</text>
  <text x="1104" y="526" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff">linwood.dev</text>
  <text x="1104" y="556" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" fill="${accent}">Blog</text>
</svg>`;
};

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts
    .filter((post) => !post.data.unlisted)
    .map((post) => ({
      params: { slug: getEntryUrl(post) },
      props: { post },
    }));
}

export async function GET({ props }: APIContext) {
  const post = props.post as Awaited<ReturnType<typeof getCollection<"blog">>>[number];
  const author = await getEntry("authors", post.data.author.id);
  const project = await getEntryProject(post);
  const svgContent = svg({
    title: post.data.title,
    date: post.data.date,
    author: author?.data.name ?? "Linwood",
    project: project?.data.title,
    logo: project?.data.logo ?? project?.id ?? "logo",
    color: project?.data.color ?? "#35EF53",
  });
  const image = await renderPng(svgContent);

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
