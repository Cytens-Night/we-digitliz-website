import type { Metadata } from "next";
import CardExperience from "@/components/CardExperience";
export const metadata: Metadata = { title: "Digital business card", description: "Connect with wedigitlize. Save our contact, share our card and explore websites, apps, branding and digital services.", alternates: { canonical: "/card" } };
export default function CardPage() { return <CardExperience/>; }
