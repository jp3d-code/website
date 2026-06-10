import { HistorySection } from "./sections/history-section";
import { IntroSection } from "./sections/intro-section";
import { TeamSection } from "./sections/team-section";
import { VideosSection } from "./sections/videos-section";

export default async function AboutPage() {
  return (
    <div className="flex flex-col">
      <IntroSection />
      <TeamSection />
      <HistorySection />
      <VideosSection />
    </div>
  );
}
