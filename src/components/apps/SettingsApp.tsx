'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { WALLPAPERS } from '@/types/os';
import { FaGithub, FaInstagram } from 'react-icons/fa6';
import { MdOutlineOpenInNew } from 'react-icons/md';

export default function SettingsApp() {
  const { currentWallpaper, setWallpaper } = useOS();

  return (
    <div className="h-full overflow-y-auto p-6 bg-surface-container-lowest">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-on-surface mb-4">Appearance</h2>
          <div className="bg-surface-container-low rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Wallpaper</h3>
            <div className="grid grid-cols-2 gap-3">
              {WALLPAPERS.map(wp => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.url)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${currentWallpaper === wp.url ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
                    }`}
                >
                  <img src={wp.url} alt={wp.name} className="w-full h-20 object-cover" />
                  <div className="p-2 bg-surface-container-low">
                    <span className="text-xs font-medium text-on-surface">{wp.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-on-surface mb-4">About</h2>
          <div className="bg-surface-container-low rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-on-surface">Version</span>
              <span className="text-on-surface-variant">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface">Framework</span>
              <span className="text-on-surface-variant">Next.js 15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface">Styling</span>
              <span className="text-on-surface-variant">Tailwind CSS</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-on-surface mb-4">Links</h2>
          <div className="bg-surface-container-low rounded-2xl p-4 space-y-3">
            <a
              href="https://github.com/cnoxs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg hover:bg-surface-variant transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant"><FaGithub /></span>
                <span className="text-on-surface">GitHub</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant"><MdOutlineOpenInNew /></span>
            </a>
            <a
              href="https://instagram.com/c4ncesur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg hover:bg-surface-variant transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant"><FaInstagram /></span>
                <span className="text-on-surface">Instagram</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant"><MdOutlineOpenInNew /></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}