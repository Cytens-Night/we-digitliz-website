"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

type TimeOfDay = "morning" | "day" | "sunset" | "night";

export function TimeAmbientOverlay() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const { setTheme } = useTheme();

  useEffect(() => {
    // Determine time of day
    const updateTime = () => {
      const hour = new Date().getHours();
      let current: TimeOfDay = "day";

      if (hour >= 5 && hour < 10) current = "morning";
      else if (hour >= 10 && hour < 17) current = "day";
      else if (hour >= 17 && hour < 20) current = "sunset";
      else current = "night";

      setTimeOfDay(current);

      // Force HTML class for next-themes to sync the base light/dark mode
      // Morning/Day = Light Mode
      // Sunset/Night = Dark Mode
      const isDark = current === "sunset" || current === "night";
      
      // Try to sync with next-themes safely (don't force if user manually overrode, but here we force for demo)
      setTheme(isDark ? "dark" : "light");
    };

    updateTime();
    
    // Check every minute in case they leave the tab open
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay transition-colors duration-1000">
      <AnimatePresence mode="wait">
        {timeOfDay === "morning" && (
          <motion.div
            key="morning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-rose-400/5 to-transparent"
          />
        )}
        
        {timeOfDay === "day" && (
          <motion.div
            key="day"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-tr from-sky-400/5 via-transparent to-yellow-200/5"
          />
        )}

        {timeOfDay === "sunset" && (
          <motion.div
            key="sunset"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-orange-600/15 via-rose-700/10 to-purple-900/20"
          />
        )}

        {timeOfDay === "night" && (
          <motion.div
            key="night"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-indigo-900/10 to-black/30"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
