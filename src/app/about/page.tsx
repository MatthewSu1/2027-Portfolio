import { AboutField } from "@/components/AboutField";
import { AboutView } from "@/components/AboutView";

export const metadata = {
  title: "About — SUMATTHEW",
};

export default function AboutPage() {
  return (
    <AboutView>
      <AboutField />
    </AboutView>
  );
}
