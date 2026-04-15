'use client';

import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;

interface Point {
  x: number;
  y: number;
}

export default function SnakeApp() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const generateFood = useCallback((): Point => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(s => s.x === newFood.x && s.y === newFood.y));
    return newFood;
  }, [snake]);

  const startGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setIsRunning(true);
    setFood(generateFood());
  };

  useEffect(() => {
    if (!isRunning || paused || gameOver) return;

    const moveSnake = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = {
          x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setIsRunning(false);
          if (score > highScore) setHighScore(score);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, paused, isRunning, highScore, score, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !gameOver) {
        e.preventDefault();
        setPaused(p => !p);
        return;
      }
      if (e.key === 'Enter' && !isRunning) {
        startGame();
        return;
      }

      const keyMap: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      const newDir = keyMap[e.key.toLowerCase()];
      if (newDir) {
        if ((newDir.x !== -direction.x || newDir.y !== -direction.y) &&
            (newDir.x !== direction.x || newDir.y !== direction.y)) {
          setDirection(newDir);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, isRunning]);

  return (
    <div className="h-full flex flex-col p-4 bg-surface-container-lowest">
      <div className="flex justify-between items-center bg-surface-container-highest/30 p-3 rounded-xl mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Score</span>
          <span className="text-xl font-extrabold text-primary">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">High Score</span>
          <span className="text-xl font-extrabold text-on-surface">{highScore}</span>
        </div>
      </div>

      <div className="flex-grow bg-surface-container-low rounded-xl p-2 aspect-square">
        <div 
          className="w-full h-full grid"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '2px'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`rounded-sm ${
                  isSnakeHead 
                    ? 'bg-primary rounded-full ring-2 ring-primary/20' 
                    : isSnakeBody 
                    ? 'bg-primary-dim rounded-sm'
                    : isFood
                    ? 'bg-error rounded-full animate-pulse'
                    : 'bg-surface-container-highest/20'
                }`}
              />
            );
          })}
        </div>
      </div>

      {!isRunning && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-center">
            <p className="text-white text-lg font-bold mb-2">Press ENTER to start</p>
            <p className="text-white/70 text-sm">Use arrow keys or WASD to move</p>
            <p className="text-white/70 text-sm">Space to pause</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl">
            <p className="text-error text-2xl font-bold mb-2">Game Over!</p>
            <p className="text-on-surface mb-4">Score: {score}</p>
            <button 
              onClick={startGame}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold"
            >
              Play Again (Enter)
            </button>
          </div>
        </div>
      )}

      {paused && isRunning && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-center">
            <p className="text-white text-2xl font-bold">PAUSED</p>
            <p className="text-white/70">Press Space to continue</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPaused(p => !p)}
          disabled={!isRunning}
          className="flex-1 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:brightness-110 transition-all text-sm disabled:opacity-50"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={startGame}
          className="flex-1 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-variant transition-all text-sm"
        >
          {isRunning ? 'Restart' : 'Start'}
        </button>
      </div>
    </div>
  );
}