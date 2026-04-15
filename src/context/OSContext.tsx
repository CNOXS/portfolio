'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { WindowState, AppInfo, APPS } from '@/types/os';

interface OSContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  currentWallpaper: string;
  openWindow: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
  toggleStartMenu: () => void;
  setWallpaper: (wallpaperUrl: string) => void;
  getAppInfo: (appId: string) => AppInfo | undefined;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsHuWu22b-84b8UMMaqd_Of6nxx5qxXt165hpwFzfG22PR3WJfEs5RmPr14X7z7nt8sx1iIjtAs2yheNPbjPkPWKZeFujvkSl6pRhrs1uD8kizIO-oYBqE8hDwgM_PvyuDWnI07Hbo6D-meWP1Z63t4NJTc4vVBf0XRgJwEx__ryIbNXq-OOQBKo9bdspmc7-K6nDi9KelCgklIzrfCZZznDogRKOA_hsepRDZEqrTU-5aLL3LKW5xpCR3x0FOwjlEdtnptaa71tIx'
  );
  const [maxZIndex, setMaxZIndex] = useState(1);

  const getAppInfo = useCallback((appId: string) => {
    return APPS.find(app => app.id === appId);
  }, []);

  const openWindow = useCallback((appId: string) => {
    const app = getAppInfo(appId);
    if (!app) return;

    const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized);
    if (existingWindow) {
      setActiveWindowId(existingWindow.id);
      setMaxZIndex(prev => prev + 1);
      setWindows(prev => prev.map(w => 
        w.id === existingWindow.id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
      ));
      return;
    }

    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);

    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: app.title,
      icon: app.icon,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { 
        x: 100 + Math.random() * 200, 
        y: 80 + Math.random() * 100 
      },
      size: app.category === 'portfolio' 
        ? { width: 700, height: 500 }
        : app.category === 'utility'
        ? { width: appId === 'calculator' ? 320 : 500, height: appId === 'calculator' ? 450 : 400 }
        : { width: 400, height: 400 },
      zIndex: newZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows, getAppInfo, maxZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    setActiveWindowId(prev => prev === windowId ? null : prev);
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    setActiveWindowId(prev => prev === windowId ? null : prev);
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setActiveWindowId(windowId);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: newZIndex, isMinimized: false } : w
    ));
  }, [maxZIndex]);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen(prev => !prev);
  }, []);

  const setWallpaper = useCallback((wallpaperUrl: string) => {
    setCurrentWallpaper(wallpaperUrl);
  }, []);

  return (
    <OSContext.Provider value={{
      windows,
      activeWindowId,
      startMenuOpen,
      currentWallpaper,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      toggleStartMenu,
      setWallpaper,
      getAppInfo,
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}