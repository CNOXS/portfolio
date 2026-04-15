'use client';

import React from 'react';
import { FaCode, FaPerson } from 'react-icons/fa6';
import { MdDesignServices } from 'react-icons/md';

export default function AboutApp() {
  const skills = ['JavaScript', 'Python', 'Node.js', 'React', 'Next.js', 'TailwindCSS'];

  return (
    <div className="h-full overflow-y-auto p-6 bg-surface-container-lowest">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}><FaPerson /></span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Can CESUR</h1>
            <p className="text-primary font-medium">Full Stack Developer</p>
            <p className="text-sm text-on-surface-variant">@CNOXS</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-on-surface mb-3">About Me</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Hi, I'm Can CESUR (also known as CNOXS). I'm a passionate developer specializing in
            building modern web applications. I love creating beautiful, functional, and
            interactive experiences. Welcome to my portfolio OS!
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-on-surface mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-tertiary-container/50 p-4 rounded-2xl">
            <span className="material-symbols-outlined text-tertiary text-2xl mb-2"><FaCode /></span>
            <h3 className="font-bold text-on-tertiary-container">Clean Code</h3>
            <p className="text-xs text-on-tertiary-container/80 mt-1">Writing maintainable, efficient code</p>
          </div>
          <div className="bg-primary-container/50 p-4 rounded-2xl">
            <span className="material-symbols-outlined text-primary text-2xl mb-2"><MdDesignServices /></span>
            <h3 className="font-bold text-on-primary-container">UI/UX Focus</h3>
            <p className="text-xs text-on-primary-container/80 mt-1">Creating beautiful interfaces</p>
          </div>
        </div>

        <div className="bg-surface-container-highest/40 p-6 rounded-2xl">
          <h3 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant/70 mb-4">Experience Level</h3>
          <div className="space-y-4">
            {['JavaScript', 'Python', 'React', 'Node.js'].map((skill, idx) => (
              <div key={skill} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{skill}</span>
                  <span className="text-primary">{90 - idx * 10}%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${90 - idx * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}