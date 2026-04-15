'use client';

import React from 'react';
import { OSProvider, useOS } from '@/context/OSContext';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import Window from '@/components/Window';
import {
  AboutApp,
  ProjectsApp,
  ContactApp,
  CalculatorApp,
  NotepadApp,
  SnakeApp,
  MinesweeperApp,
  SettingsApp,
} from '@/components/apps';

function AppContent() {
  const { windows } = useOS();

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'contact':
        return <ContactApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'notepad':
        return <NotepadApp />;
      case 'snake':
        return <SnakeApp />;
      case 'minesweeper':
        return <MinesweeperApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface">
      <Desktop />
      
      {windows.map(window => (
        <Window
          key={window.id}
          windowId={window.id}
          title={window.title}
          icon={window.icon}
        >
          {renderAppContent(window.appId)}
        </Window>
      ))}
      
      <Taskbar />
    </div>
  );
}

export default function Home() {
  return (
    <OSProvider>
      <AppContent />
    </OSProvider>
  );
}