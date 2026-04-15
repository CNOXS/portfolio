'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MdOutlineMood, MdSentimentSatisfiedAlt } from 'react-icons/md';

const GRID_SIZE = 10;
const MINES_COUNT = 10;

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export default function MinesweeperApp() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [minesLeft, setMinesLeft] = useState(MINES_COUNT);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const initializeGrid = useCallback((): Cell[][] => {
    const newGrid: Cell[][] = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      newGrid[y] = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        newGrid[y][x] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0,
        };
      }
    }

    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[y][x].isMine) {
        newGrid[y][x].isMine = true;
        minesPlaced++;
      }
    }

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!newGrid[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE && newGrid[ny][nx].isMine) {
                count++;
              }
            }
          }
          newGrid[y][x].neighborCount = count;
        }
      }
    }

    return newGrid;
  }, []);

  const startGame = () => {
    setGrid(initializeGrid());
    setMinesLeft(MINES_COUNT);
    setGameOver(false);
    setGameWon(false);
    setTime(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning && !gameOver && !gameWon) {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, gameOver, gameWon]);

  const revealCell = (x: number, y: number) => {
    if (gameOver || gameWon || grid[y][x].isFlagged || grid[y][x].isRevealed) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    const newGrid = [...grid.map(row => [...row])];

    if (newGrid[y][x].isMine) {
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
      setGrid(newGrid);
      setGameOver(true);
      setIsRunning(false);
      return;
    }

    const reveal = (cx: number, cy: number) => {
      if (cx < 0 || cx >= GRID_SIZE || cy < 0 || cy >= GRID_SIZE ||
        newGrid[cy][cx].isRevealed || newGrid[cy][cx].isFlagged) return;

      newGrid[cy][cx].isRevealed = true;

      if (newGrid[cy][cx].neighborCount === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            reveal(cx + dx, cy + dy);
          }
        }
      }
    };

    reveal(x, y);
    setGrid(newGrid);

    const allRevealed = newGrid.every(row => row.every(cell => cell.isMine || cell.isRevealed));
    if (allRevealed) {
      setGameWon(true);
      setIsRunning(false);
    }
  };

  const toggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || gameWon || grid[y][x].isRevealed) return;

    const newGrid = [...grid.map(row => [...row])];
    if (newGrid[y][x].isFlagged) {
      newGrid[y][x].isFlagged = false;
      setMinesLeft(m => m + 1);
    } else {
      newGrid[y][x].isFlagged = true;
      setMinesLeft(m => m - 1);
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    startGame();
  }, []);

  const getNumberColor = (count: number) => {
    const colors = ['', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-500', 'text-cyan-500', 'text-black-500', 'text-gray-500'];
    return colors[count] || 'text-on-surface';
  };

  return (
    <div className="h-full flex flex-col p-4 bg-surface-container-lowest">
      <div className="flex items-center justify-between mb-4 px-4 py-3 bg-surface-container-low rounded-2xl border border-outline-variant/10">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">Mines</span>
          <span className="font-mono text-xl font-bold text-tertiary">{String(minesLeft).padStart(3, '0')}</span>
        </div>
        <button
          onClick={startGame}
          className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: gameOver || gameWon ? "'FILL' 1" : "'FILL' 0" }}>
            {gameOver ? 'sentiment_very_dissatisfied' : gameWon ? <MdSentimentSatisfiedAlt /> : <MdOutlineMood />}
          </span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">Time</span>
          <span className="font-mono text-xl font-bold text-tertiary">{String(time).padStart(3, '0')}</span>
        </div>
      </div>

      <div className="flex-grow p-2 bg-surface-container-highest/40 rounded-xl">
        <div
          className="w-full h-full grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '4px'
          }}
        >
          {grid.map((row, y) => row.map((cell, x) => (
            <button
              key={`${x}-${y}`}
              onClick={() => revealCell(x, y)}
              onContextMenu={(e) => toggleFlag(e, x, y)}
              className={`aspect-square rounded-md flex items-center justify-center text-sm font-bold transition-all ${cell.isRevealed
                  ? cell.isMine
                    ? 'bg-error text-white'
                    : cell.neighborCount === 0
                      ? 'bg-surface-container-low'
                      : `bg-surface-container-low ${getNumberColor(cell.neighborCount)}`
                  : cell.isFlagged
                    ? 'bg-surface-container-highest'
                    : 'bg-surface-container-lowest hover:bg-surface-container-high shadow-sm'
                }`}
              disabled={gameOver || gameWon}
            >
              {cell.isFlagged && !cell.isRevealed && (
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
              )}
              {cell.isRevealed && cell.neighborCount > 0 && !cell.isMine && cell.neighborCount}
            </button>
          )))}
        </div>
      </div>

      {(gameOver || gameWon) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl">
            <p className={`text-2xl font-bold mb-2 ${gameWon ? 'text-green-500' : 'text-error'}`}>
              {gameWon ? 'You Win!' : 'Game Over'}
            </p>
            <p className="text-on-surface mb-4">Time: {time}s</p>
            <button
              onClick={startGame}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}