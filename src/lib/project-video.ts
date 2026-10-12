import fs from "node:fs";
import path from "node:path";

const VIDEO = /\.(mp4|webm|mov)$/i;
const IMAGE = /\.(png|jpe?g|webp|gif|avif)$/i;
const MEDIA = /\.(mp4|webm|mov|png|jpe?g|webp|gif|avif)$/i;

export type ProjectKind = "video" | "image";

export type ProjectVideo = {
  id: string;
  title: string;
  src: string;
  kind: ProjectKind;
  poster?: string;
};

type Asset = {
  file: string;
  root: string;
  folder: string;
};

function isDroppedAirAlly(filePath: string) {
  const name = path.basename(filePath);
  if (!/airally/i.test(name)) {
    return false;
  }
  return !/hero\s*video/i.test(name);
}

function isCaseStudyStill(filePath: string) {
  return /project\s*image|official\s*hero|project\s*page\s*hero|marketing|solution/i.test(
    path.basename(filePath),
  );
}

function collectAssets(dir: string, root: string, found: Asset[] = []): Asset[] {
  if (!fs.existsSync(dir)) {
    return found;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectAssets(full, root, found);
      continue;
    }

    if (
      !MEDIA.test(entry.name) ||
      isDroppedAirAlly(full) ||
      isCaseStudyStill(full)
    ) {
      continue;
    }

    const relative = path.relative(root, full).split(path.sep);
    found.push({
      file: full,
      root,
      folder: relative.length > 1 ? relative[0] : path.basename(root),
    });
  }

  return found;
}

function publicUrl(filePath: string, version: number) {
  const publicDir = path.join(process.cwd(), "public");
  const relative = path.relative(publicDir, filePath).split(path.sep).join("/");
  return `/${relative.split("/").map(encodeURIComponent).join("/")}?v=${version}`;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function assetUrl(asset: Asset) {
  const publicRoot = path.join(process.cwd(), "public");
  const sourceStat = fs.statSync(asset.file);

  if (asset.file.startsWith(publicRoot)) {
    return publicUrl(asset.file, Math.round(sourceStat.mtimeMs));
  }

  const dest = path.join(
    process.cwd(),
    "public",
    "projects",
    path.relative(asset.root, asset.file),
  );

  try {
    const destStale =
      !fs.existsSync(dest) || fs.statSync(dest).mtimeMs < sourceStat.mtimeMs;

    if (destStale) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(asset.file, dest);
    }

    return publicUrl(dest, Math.round(sourceStat.mtimeMs));
  } catch {
    if (fs.existsSync(dest)) {
      return publicUrl(dest, Math.round(fs.statSync(dest).mtimeMs));
    }

    return publicUrl(asset.file, Math.round(sourceStat.mtimeMs));
  }
}

function imageScore(file: string) {
  const name = path.basename(file);
  if (/hero\s*image/i.test(name)) {
    return 0;
  }
  if (/2\.(png|jpe?g|webp|gif|avif)$/i.test(name)) {
    return 1;
  }
  if (/cover/i.test(name)) {
    return 3;
  }
  return 2;
}

function videoScore(file: string) {
  if (/hero\s*video/i.test(file)) {
    return 0;
  }
  if (/main\s*hero/i.test(file)) {
    return 1;
  }
  return 2;
}

function mergeAssets(groups: Asset[][]) {
  const byKey = new Map<string, Asset>();

  for (const group of groups) {
    for (const asset of group) {
      const key = `${asset.folder.toLowerCase()}/${path.basename(asset.file).toLowerCase()}`;
      const existing = byKey.get(key);
      const preferSrc =
        !existing ||
        asset.root.endsWith(`${path.sep}src${path.sep}projects`) ||
        asset.root.endsWith(`${path.sep}src/projects`);

      if (!existing || preferSrc) {
        byKey.set(key, asset);
      }
    }
  }

  return [...byKey.values()];
}

function groupProjects(assets: Asset[]): ProjectVideo[] {
  const folders = new Map<string, Asset[]>();

  for (const asset of assets) {
    const list = folders.get(asset.folder) ?? [];
    list.push(asset);
    folders.set(asset.folder, list);
  }

  const projects: ProjectVideo[] = [];

  for (const [folder, files] of folders) {
    const images = files
      .filter((asset) => IMAGE.test(asset.file))
      .sort(
        (a, b) =>
          imageScore(a.file) - imageScore(b.file) ||
          a.file.localeCompare(b.file),
      );
    const videos = files
      .filter((asset) => VIDEO.test(asset.file))
      .sort(
        (a, b) =>
          videoScore(a.file) - videoScore(b.file) ||
          a.file.localeCompare(b.file),
      );

    const featured = images[0];
    const preview =
      images.find((asset) => /cover/i.test(asset.file) && asset !== featured) ??
      images.find((asset) => asset !== featured);
    const video = videos[0];

    if (video) {
      const id = slug(folder);
      projects.push({
        id,
        title: folder,
        src: assetUrl(video),
        kind: "video",
        poster:
          id === "airally" || !featured ? undefined : assetUrl(featured),
      });
      continue;
    }

    if (featured) {
      projects.push({
        id: slug(folder),
        title: folder,
        src: assetUrl(featured),
        kind: "image",
        poster: preview ? assetUrl(preview) : undefined,
      });
    }
  }

  return projects.sort((a, b) => {
    const featuredA = a.id === "airally" ? 0 : 1;
    const featuredB = b.id === "airally" ? 0 : 1;
    if (featuredA !== featuredB) {
      return featuredA - featuredB;
    }
    return a.title.localeCompare(b.title);
  });
}

export function resolveProjectVideos(): ProjectVideo[] {
  const publicDir = path.join(process.cwd(), "public", "projects");
  const srcDir = path.join(process.cwd(), "src", "projects");
  const rootDir = path.join(process.cwd(), "projects");

  fs.mkdirSync(publicDir, { recursive: true });

  const assets = mergeAssets([
    collectAssets(srcDir, srcDir),
    collectAssets(rootDir, rootDir),
    collectAssets(publicDir, publicDir),
  ]);

  return groupProjects(assets);
}

export function resolveCaseStudyImage(projectSlug: string): string | undefined {
  return resolveProjectImage(projectSlug, /official\s*hero/i);
}

const STATIC = /\.(png|jpe?g|webp|gif|avif|svg|mp4|webm|mov)$/i;

function collectFilesByName(
  dir: string,
  root: string,
  filePattern: RegExp,
  found: Asset[] = [],
): Asset[] {
  if (!fs.existsSync(dir)) {
    return found;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectFilesByName(full, root, filePattern, found);
      continue;
    }

    if (!STATIC.test(entry.name) || !filePattern.test(entry.name)) {
      continue;
    }

    const relative = path.relative(root, full).split(path.sep);
    found.push({
      file: full,
      root,
      folder: relative.length > 1 ? relative[0] : path.basename(root),
    });
  }

  return found;
}

export function resolveProjectImage(
  projectSlug: string,
  filePattern: RegExp,
): string | undefined {
  const publicDir = path.join(process.cwd(), "public", "projects");
  const srcDir = path.join(process.cwd(), "src", "projects");
  const rootDir = path.join(process.cwd(), "projects");

  fs.mkdirSync(publicDir, { recursive: true });

  const assets = mergeAssets([
    collectFilesByName(srcDir, srcDir, filePattern),
    collectFilesByName(rootDir, rootDir, filePattern),
    collectFilesByName(publicDir, publicDir, filePattern),
  ]);

  const match = assets.find((asset) => slug(asset.folder) === projectSlug);
  return match ? assetUrl(match) : undefined;
}

export function resolveProjectFile(
  projectSlug: string,
  filePattern: RegExp,
): string | undefined {
  return resolveProjectImage(projectSlug, filePattern);
}

export function resolveProjectMark(projectSlug: string): string | undefined {
  return resolveProjectFile(projectSlug, /colour\s*pads/i);
}
