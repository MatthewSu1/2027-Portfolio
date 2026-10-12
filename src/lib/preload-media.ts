import type { Project } from "@/lib/projects";

const PRELOAD_LIMIT_MS = 8000;
const IMAGE_LIMIT_MS = 2500;

function uniqueUrls(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

export function projectImageUrls(
  projects: Project[],
  marks: Record<string, string | undefined> = {},
) {
  return uniqueUrls([
    ...projects.flatMap((project) => [project.poster, project.src]),
    ...Object.values(marks),
  ]).filter((url) => !/\.(mp4|webm|mov)(\?|$)/i.test(url));
}

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(limit);
      resolve();
    };
    const limit = window.setTimeout(finish, IMAGE_LIMIT_MS);

    image.onload = finish;
    image.onerror = finish;
    image.src = url;

    if (image.complete) {
      finish();
    }
  });
}

function preloadVideo(url: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(limit);
      resolve();
    };
    const limit = window.setTimeout(finish, 4000);

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.src = url;
    video.load();
  });
}

export function preloadProjectImages(
  projects: Project[],
  marks: Record<string, string | undefined> = {},
) {
  const urls = projectImageUrls(projects, marks);
  const featuredVideo = projects.find((project) => project.kind === "video")?.src;
  const loaded = Promise.all([
    ...urls.map(preloadImage),
    featuredVideo ? preloadVideo(featuredVideo) : Promise.resolve(),
  ]).then(() => undefined);

  return Promise.race([
    loaded,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, PRELOAD_LIMIT_MS);
    }),
  ]);
}
