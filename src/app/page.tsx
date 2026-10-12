import { IntroHome } from "@/components/IntroHome";
import { projectImageUrls } from "@/lib/preload-media";
import { createProjects } from "@/lib/projects";
import { resolveProjectMark, resolveProjectVideos } from "@/lib/project-video";

export default function Home() {
  const videos = resolveProjectVideos();
  const marks = {
    bmw: resolveProjectMark("bmw"),
  };
  const images = projectImageUrls(createProjects(videos), marks);

  return (
    <>
      {images.map((href) => (
        <link key={href} rel="preload" as="image" href={href} />
      ))}
      <IntroHome videos={videos} marks={marks} />
    </>
  );
}
