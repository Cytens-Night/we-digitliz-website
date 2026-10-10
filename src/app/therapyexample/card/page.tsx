import type { Metadata } from "next";
import CardExperience from "./CardExperience";

export const metadata: Metadata = {
  title: { absolute: "Mark Carnell | Kinesis Digital Card" },
  description:
    "Call, email, save or share the Kinesis Hypnotherapy contact card for Mark Carnell in Leyton, London.",
  alternates: { canonical: "/therapyexample/card" },
  robots: { index: false, follow: true },
};

export default function TherapyCardPage() {
  return <CardExperience />;
}
