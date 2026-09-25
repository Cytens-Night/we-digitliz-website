"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
