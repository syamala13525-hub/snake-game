import React from 'react';
import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';
import { NeonCard } from './components/NeonCard';
import { Music, Gamepad2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 scanline relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
              <Zap className="text-cyan-400" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
                Neon <span className="text-cyan-400">Pulse</span>
              </h1>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Snake & Synth v1.0</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-6 text-[10px] font-mono text-white/60 uppercase tracking-widest"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>System Online</span>
            </div>
            <div className="hidden sm:block">
              <span>Latency: 12ms</span>
            </div>
          </motion.div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Stats & Info */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <NeonCard title="Game Stats">
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Difficulty</span>
                  <span className="text-sm font-bold text-cyan-400">HARDCORE</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Multiplier</span>
                  <span className="text-sm font-bold text-fuchsia-400">x1.5</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Rank</span>
                  <span className="text-sm font-bold text-white">ELITE</span>
                </div>
              </div>
            </NeonCard>

            <NeonCard title="Instructions">
              <ul className="text-[11px] font-mono text-white/60 space-y-2 uppercase leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-cyan-400">01</span>
                  <span>Use arrow keys to navigate the pulse</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">02</span>
                  <span>Collect data nodes to increase score</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">03</span>
                  <span>Avoid wall collisions & self-looping</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">04</span>
                  <span>Space to pause / resume system</span>
                </li>
              </ul>
            </NeonCard>
          </div>

          {/* Center Column - Game */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <NeonCard className="p-0 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad2 size={16} className="text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Main Terminal</span>
                </div>
                <SnakeGame />
              </div>
            </NeonCard>
          </div>

          {/* Right Column - Music Player */}
          <div className="lg:col-span-3 space-y-6 order-3">
            <NeonCard title="Neural Audio">
              <div className="flex items-center gap-2 mb-4">
                <Music size={16} className="text-fuchsia-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Synth Engine</span>
              </div>
              <MusicPlayer />
            </NeonCard>

            <NeonCard title="Visualizer">
              <div className="flex items-end justify-between h-20 gap-1 px-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [
                        Math.random() * 100 + '%', 
                        Math.random() * 100 + '%', 
                        Math.random() * 100 + '%'
                      ] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5 + Math.random(),
                      ease: "easeInOut"
                    }}
                    className="flex-1 bg-gradient-to-t from-fuchsia-500/20 to-fuchsia-500 rounded-t-sm"
                  />
                ))}
              </div>
            </NeonCard>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
          <p>© 2026 NEON PULSE SYSTEMS • ALL RIGHTS RESERVED</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
