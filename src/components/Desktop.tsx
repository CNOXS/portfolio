'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { APPS } from '@/types/os';

export default function Desktop() {
  const { openWindow, currentWallpaper, windows } = useOS();

  const portfolioApps = APPS.filter(app => app.category === 'portfolio');
  const utilityGames = APPS.filter(app => ['calculator', 'snake', 'notepad', 'minesweeper', 'settings'].includes(app.id));

  return (
    <div
      className="fixed inset-0 top-12 bottom-20 p-6"
      style={{
        backgroundImage: `url(${currentWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="grid grid-cols-1 gap-y-6 w-fit">
        {portfolioApps.map(app => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id)}
            className="group flex flex-col items-center gap-2 w-24 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 desktop-icon"
          >
            <div className={`w-14 h-14 ${app.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform`}>
              <span className={`material-symbols-outlined text-3xl ${app.iconColor}`}>{<app.icon />}</span>
            </div>
            <span className="text-sm font-medium text-white text-shadow-sm">{app.title}</span>
          </button>
        ))}

        <div className="h-4" />

        <div className="flex gap-4">
          {utilityGames.map(app => (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="group flex flex-col items-center gap-1 p-1 rounded-xl hover:bg-white/10 transition-all duration-200 desktop-icon"
            >
              <div className={`w-10 h-10 ${app.iconBg} rounded-xl flex items-center justify-center shadow-md group-active:scale-90 transition-transform`}>
                <span className={`material-symbols-outlined text-xl ${app.iconColor}`}>{<app.icon />}</span>
              </div>
              <span className="text-xs text-white text-shadow-sm opacity-90">{app.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}