'use client';

import React, { useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa6';
import { MdAttachment, MdSend } from 'react-icons/md';

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-surface-container-lowest">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-on-surface mb-2">Get in touch</h1>
          <p className="text-on-surface-variant text-sm">
            Feel free to reach out for collaborations, questions, or just to say hello!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant ml-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant ml-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">Subject</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none"
            >
              <option value="general">General Inquiry</option>
              <option value="collaboration">Collaboration</option>
              <option value="project">Project Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message..."
              rows={5}
              className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary transition-colors"><MdAttachment /></span>
              <span className="text-xs cursor-pointer hover:text-primary transition-colors">Attach file</span>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dim text-on-primary px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 group"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"><MdSend /></span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/20">
          <div className="text-sm font-semibold text-on-surface-variant mb-3">Or connect via:</div>
          <div className="flex gap-4">
            <a
              href="https://github.com/cnoxs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-lg"><FaGithub /></span>
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://instagram.com/c4ncesur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-lg"><FaInstagram /></span>
              <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}