import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastContainerProps {
  message: string;
}

export default function ToastContainer({ message }: ToastContainerProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 size={18} className="text-primary" />
          <span className="font-medium text-sm sm:text-base">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
