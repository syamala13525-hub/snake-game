import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';
import { DUMMY_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col gap-6">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex items-center gap-4">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 rounded-lg overflow-hidden border border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="flex gap-1 items-end h-8">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, 24, 12, 20, 8] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-white truncate">{currentTrack.title}</h4>
          <p className="text-sm text-cyan-400/80 font-mono">{currentTrack.artist}</p>
          
          <div className="mt-4 flex items-center gap-3">
            <button 
              onClick={handlePrev}
              className="p-2 text-white/70 hover:text-cyan-400 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="p-3 bg-cyan-500 text-black rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] active:scale-95"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            <button 
              onClick={handleNext}
              className="p-2 text-white/70 hover:text-cyan-400 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-tighter">
          <span>Now Playing</span>
          <div className="flex items-center gap-1">
            <Volume2 size={10} />
            <span>Stereo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
