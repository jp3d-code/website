import { HistorySection } from "./history-section";
import { IntroSection } from "./intro-section";
import { TeamSection } from "./team-section";
import { VideosSection } from "./videos-section";

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
