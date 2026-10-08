import type { Metadata } from "next";
import AutoRestaurantExperience from "./experience";

export const metadata: Metadata = {
  title: "AutoRestaurant — Intelligent Hospitality by WeDigitlize",
  description: "Explore the premium restaurant automation experience: conversational digital host, table QR ordering, kitchen tickets, service requests and owner insights.",
  alternates: { canonical: "/autorestaurant" },
  openGraph: { title: "AutoRestaurant | Hospitality, beautifully handled", description: "A connected guest, kitchen and management experience by WeDigitlize.", type: "website" },
};

export default function AutoRestaurantPage() {
  return <AutoRestaurantExperience />;
}
