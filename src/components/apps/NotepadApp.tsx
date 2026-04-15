'use client';

import React, { useState } from 'react';

export default function NotepadApp() {
  const [content, setContent] = useState(`# Welcome to Notepad

This is your personal note-taking app!
Write your thoughts, ideas, or code here.

## Features:
- Auto-save (simulated)
- Clean interface
- Dark mode support

## Tips:
Use markdown for formatting!

"Simplicity is the ultimate sophistication."
- Leonardo da Vinci`);

  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setLineCount(text.split('\n').length);
    setCharCount(text.length);
  };

  return (
    <div className="h-full flex flex-col bg-surface-container-lowest">
      <div className="flex-grow p-4 bg-surface-container-lowest/80 overflow-y-auto">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full bg-transparent border-none focus:ring-0 p-0 text-on-surface leading-relaxed resize-none font-mono text-sm"
          spellCheck={false}
        />
      </div>
      <div className="px-4 py-2 bg-surface-container-high/30 border-t border-outline-variant/10 flex justify-between items-center">
        <span className="text-xs text-on-surface-variant tracking-wider uppercase">Draft</span>
        <span className="text-xs text-on-surface-variant">Lines: {lineCount} | Chars: {charCount}</span>
      </div>
    </div>
  );
}