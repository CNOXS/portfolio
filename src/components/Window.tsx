'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { useOS } from '@/context/OSContext';
import { IconType } from 'react-icons';

interface WindowProps {
  windowId: string;
  title: string;
  icon: IconType;
  children: ReactNode;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
}

export default function Window({
  windowId,
  title,
  icon: Icon,
  children,
  initialSize,
  initialPosition
}: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    activeWindowId
  } = useOS();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const window = windows.find(w => w.id === windowId);
  const isActive = activeWindowId === windowId;

  if (!window || window.isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    focusWindow(windowId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, e.clientX - dragOffset.x);
      const newY = Math.max(48, e.clientY - dragOffset.y);
      updateWindowPosition(windowId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowId, updateWindowPosition]);

  const size = window.size;
  const position = window.position;

  if (window.isMaximized) {
    return (
      <div
        className={`fixed inset-0 top-12 bottom-20 glass-panel bg-white/80 dark:bg-slate-900/80 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col ${isActive ? 'ring-2 ring-primary/30' : ''}`}
        style={{ zIndex: window.zIndex }}
        onMouseDown={() => focusWindow(windowId)}
      >
        <div className="h-10 flex items-center justify-between px-4 bg-surface-container-low/50 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="window-controls flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
              />
              <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
              />
              <button
                onClick={(e) => { e.stopPropagation(); maximizeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-on-surface-variant">{Icon ? <Icon /> : ""}</span>
            <span className="text-sm font-medium text-on-surface">{title}</span>
          </div>
          <div className="w-16" />
        </div>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className={`fixed glass-panel bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${isActive ? 'ring-2 ring-primary/30' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => focusWindow(windowId)}
    >
      <div
        className="h-10 flex items-center justify-between px-4 bg-surface-container-low/50 border-b border-outline-variant/10 cursor-grab window-drag select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <div className="window-controls flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
            />
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
            />
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(windowId); }}
              className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-on-surface-variant">{Icon ? <Icon /> : ""}</span>
          <span className="text-sm font-medium text-on-surface">{title}</span>
        </div>
        <div className="w-16" />
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}