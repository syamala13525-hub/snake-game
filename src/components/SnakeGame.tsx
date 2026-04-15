import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, Play, Pause } from 'lucide-react';
import { Point, Direction, GameState } from '../types';
import { GAME_CONFIG } from '../constants';

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    isGameOver: false,
    isPaused: true,
  });
  const [speed, setSpeed] = useState(GAME_CONFIG.INITIAL_SPEED);

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GAME_CONFIG.GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GAME_CONFIG.GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameState(prev => ({ ...prev, isGameOver: true }));
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setGameState(prev => {
          const newScore = prev.score + 10;
          const newHighScore = Math.max(newScore, prev.highScore);
          if (newHighScore > prev.highScore) {
            localStorage.setItem('snakeHighScore', newHighScore.toString());
          }
          return { ...prev, score: newScore, highScore: newHighScore };
        });
        generateFood(newSnake);
        setSpeed(prev => Math.max(GAME_CONFIG.MIN_SPEED, prev - GAME_CONFIG.SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState.isGameOver, gameState.isPaused]);

  const generateFood = (currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE),
        y: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': 
          if (gameState.isGameOver) resetGame();
          else setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameState.isGameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GAME_CONFIG.GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GAME_CONFIG.GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#f5f';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#f5f';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#0ff' : 'rgba(6, 182, 212, 0.8)';
      if (isHead) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0ff';
      }
      
      const padding = 2;
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2
      );
      ctx.shadowBlur = 0;
    });
  }, [snake, food]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameState(prev => ({ ...prev, score: 0, isGameOver: false, isPaused: false }));
    setSpeed(GAME_CONFIG.INITIAL_SPEED);
    generateFood([{ x: 10, y: 10 }]);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Score</span>
          <span className="text-2xl font-bold text-white tabular-nums">{gameState.score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest flex items-center gap-1">
            <Trophy size={10} /> High Score
          </span>
          <span className="text-2xl font-bold text-white tabular-nums">{gameState.highScore}</span>
        </div>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.1)] bg-black"
        />
        
        {(gameState.isPaused || gameState.isGameOver) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
            <div className="text-center p-8">
              {gameState.isGameOver ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl font-black text-fuchsia-500 uppercase italic tracking-tighter">Game Over</h2>
                  <p className="text-cyan-400 font-mono text-sm">FINAL SCORE: {gameState.score}</p>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-6 py-3 bg-fuchsia-600 text-white rounded-full hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] mx-auto"
                  >
                    <RotateCcw size={20} /> TRY AGAIN
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl font-black text-cyan-400 uppercase italic tracking-tighter">Ready?</h2>
                  <p className="text-white/60 font-mono text-xs uppercase tracking-widest">Use Arrows to Move • Space to Start</p>
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, isPaused: false }))}
                    className="flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] mx-auto text-lg font-bold"
                  >
                    <Play size={24} fill="currentColor" /> START PULSE
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))}
          disabled={gameState.isGameOver}
          className="p-3 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500/10 transition-colors disabled:opacity-30"
        >
          {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
        <button 
          onClick={resetGame}
          className="p-3 border border-fuchsia-500/30 rounded-full text-fuchsia-400 hover:bg-fuchsia-500/10 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};
