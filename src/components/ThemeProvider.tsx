"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { TimeAmbientOverlay } from "./TimeAmbientOverlay"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      themes={['theme-morning', 'theme-day', 'theme-sunset', 'theme-night', 'light', 'dark']}
      {...props}
    >
      <TimeAmbientOverlay />
      {children}
    </NextThemesProvider>
  )
}
