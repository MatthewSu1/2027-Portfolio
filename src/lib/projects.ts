import type { ProjectKind, ProjectVideo } from "@/lib/project-video";
import { getProjectMeta, projectHref } from "@/lib/project-pages";

export type { ProjectKind };

export type Project = {
  id: string;
  title: string;
  type: string;
  client: string;
  kind: ProjectKind;
  src?: string;
  poster?: string;
  endHoldMs?: number;
  href?: string;
  aspect?: "wide";
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export function createProjects(videos: ProjectVideo[]): Project[] {
  return videos.map((video) => {
    const meta = getProjectMeta(video.id);

    return {
      id: video.id,
      title: meta?.title ?? video.title,
      type: meta?.type ?? "Type",
      client: meta?.client ?? "Client",
      kind: video.kind,
      src: video.src,
      poster: video.poster,
      endHoldMs: video.id === "whosays" ? 2000 : undefined,
      href: projectHref(video.id),
      aspect: meta?.aspect,
      objectFit: meta?.objectFit,
      objectPosition: meta?.objectPosition,
    };
  });
}

export function wrapIndex(index: number, length: number) {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
}

export function projectAt(projects: Project[], active: number, offset: number) {
  return projects[wrapIndex(active + offset, projects.length)];
}

function tokenWidth(name: string) {
  const node = document.createElement("div");
  node.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:var(${name})`;
  document.body.append(node);
  const width = node.getBoundingClientRect().width;
  node.remove();
  return width;
}

export function carouselCoverRange() {
  const step = tokenWidth("--carousel-step");
  const featured = tokenWidth("--media-featured-w");

  if (step <= 0) {
    return 4;
  }

  const reach = window.innerWidth / 2 - featured / 2;
  return Math.max(2, Math.min(8, Math.ceil(reach / step) + 2));
}
