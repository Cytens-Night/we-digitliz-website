import type { Metadata } from "next";
import CampaignStudio from "./CampaignStudio";
import "./campaign.css";

export const metadata: Metadata = {
  title: "Cinematic Campaign Studio | WeDigitlize",
  description: "Private cinematic previews of WeDigitlize's websites, branding, digital cards and creative services.",
  robots: { index: false, follow: false },
};

export default function CampaignPreviewPage() {
  return <main id="main-content"><CampaignStudio /></main>;
}
