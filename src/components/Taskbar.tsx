'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from '@/context/OSContext';
import { APPS, WALLPAPERS } from '@/types/os';

import { IoMdApps } from "react-icons/io";
import { FaPerson, FaWifi } from 'react-icons/fa6';
import { BsBatteryFull, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdOutlineSettingsPower } from 'react-icons/md';

export default function Taskbar() {
  const {
    windows,
    openWindow,
    activeWindowId,
    startMenuOpen,
    toggleStartMenu,
    currentWallpaper,
    setWallpaper,
    focusWindow,
  } = useOS();

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openApps = APPS.filter(app =>
    windows.some(w => w.appId === app.id && w.isOpen)
  );

  const pinnedApps = APPS.filter(app =>
    ['about', 'projects', 'contact', 'calculator', 'notepad'].includes(app.id)
  );

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
        <div className="w-auto min-w-[400px] max-w-[600px] rounded-2xl px-3 py-2 glass-panel bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg flex items-center gap-1">
          <button
            onClick={toggleStartMenu}
            className={`w-12 h-12 flex items-center justify-center rounded-xl hover:scale-110 transition-transform duration-200 active:scale-90 ${startMenuOpen ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'text-slate-600 dark:text-slate-400'
              }`}
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: startMenuOpen ? "'FILL' 1" : "'FILL' 0" }}><IoMdApps /></span>
          </button>

          <div className="h-8 w-[1px] bg-outline-variant/20 mx-1" />

          {openApps.map(app => {
            const window = windows.find(w => w.appId === app.id && w.isOpen);
            const isActive = window && activeWindowId === window.id;
            const isMinimized = window?.isMinimized;
            return (
              <button
                key={app.id}
                onClick={() => window ? (isMinimized ? focusWindow(window.id) : focusWindow(window.id)) : openWindow(app.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl hover:scale-110 transition-transform duration-200 active:scale-90 relative ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : isMinimized ? 'opacity-50 text-slate-400' : 'text-slate-600 dark:text-slate-400'
                  }`}
              >
                <span className="material-symbols-outlined text-2xl">{<app.icon />}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}

          <div className="h-8 w-[1px] bg-outline-variant/20 mx-1" />

          <div className="flex items-center gap-2 px-2 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined text-lg"><FaWifi /></span>
            <span className="material-symbols-outlined text-lg"><BsFillVolumeUpFill /></span>
            <span className="material-symbols-outlined text-lg"><BsBatteryFull /></span>
          </div>

          <div className="h-8 w-[1px] bg-outline-variant/20 mx-1" />

          <div className="text-sm font-medium text-on-surface-variant px-2">
            {currentTime}
          </div>
        </div>
      </div>

      {startMenuOpen && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[480px] glass-panel bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl overflow-hidden z-50 border border-white/30 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="p-4 flex flex-col">
            <div className="mb-4">
              <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Pinned</div>
              <div className="grid grid-cols-4 gap-2">
                {pinnedApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => openWindow(app.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${app.iconBg}`}>
                      <span className={`material-symbols-outlined text-2xl ${app.iconColor}`}>{<app.icon />}</span>
                    </div>
                    <span className="text-xs font-medium text-on-surface">{app.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Wallpaper</div>
              <div className="grid grid-cols-4 gap-2">
                {WALLPAPERS.map(wp => (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.url)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${currentWallpaper === wp.url ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
                      }`}
                  >
                    <img src={wp.url} alt={wp.name} className="w-full h-12 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm"><FaPerson /></span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-on-surface">CNOXS</div>
                  <div className="text-[10px] text-on-surface-variant">Portfolio OS</div>
                </div>
              </div>
              <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg text-red-500"><MdOutlineSettingsPower /></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}