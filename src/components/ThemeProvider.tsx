"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem themes={["light","dark","theme-morning","theme-day","theme-sunset","theme-night"]} disableTransitionOnChange><MotionConfig reducedMotion="user">{children}</MotionConfig></NextThemesProvider>;
}
