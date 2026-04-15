import React from 'react';
import { motion } from 'motion/react';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const NeonCard: React.FC<NeonCardProps> = ({ children, className = '', title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-black/80 border border-cyan-500/30 rounded-xl overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)] ${className}`}
    >
      {/* Neon Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50" />
      
      {title && (
        <div className="px-4 py-2 border-bottom border-cyan-500/20 bg-cyan-500/5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            {title}
          </h3>
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};
