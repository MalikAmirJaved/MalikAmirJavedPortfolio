import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

export type ProjectImage = {
  src: string;
  alt: string;
};

/**
 * Lists images inside public/<folder>. Falls back to an empty array when the
 * folder does not exist (caller renders a gradient placeholder instead).
 */
export function getProjectImages(folder: string): ProjectImage[] {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();

  const base = folder.replace(/^\/+/, "").replace(/\/+$/, "");

  return files.map((file, i) => ({
    src: `/${base}/${encodeURIComponent(file)}`,
    alt: `Project screenshot ${i + 1}`,
  }));
}
