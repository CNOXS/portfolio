'use client';

import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
  topics: string[];
  fork: string;
}

const TOPIC_EMOJIS: Record<string, string> = {
  'react': '⚛️',
  'nextjs': '▲',
  'javascript': '🟨',
  'typescript': '🔷',
  'python': '🐍',
  'node': '🟩',
  'api': '🔌',
  'machine-learning': '🤖',
  'deep-learning': '🧠',
  'web': '🌐',
  'portfolio': '💼',
  'game': '🎮',
  'discord': '💬',
  'bot': '🤖',
  'automation': '⚙️',
  'tool': '🛠️',
  'cli': '⌨️',
  'utility': '🔧',
};

function getTopicEmoji(topic: string): string {
  return TOPIC_EMOJIS[topic.toLowerCase()] || '📦';
}

export default function ProjectsApp() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/cnoxs/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data.filter((repo: Repository) => !repo.fork));
      } catch (err) {
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const visibleRepos = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-surface-container-lowest">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-surface-container-lowest">
        <div className="text-center">
          <p className="text-error">{error}</p>
          <button className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-surface-container-lowest">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaGithub className="text-2xl text-on-surface" />
          <h2 className="text-lg font-bold text-on-surface">GitHub Repositories</h2>
        </div>
        <span className="text-sm text-on-surface-variant">{repos.length} repositories</span>
      </div>

      {hasMore && (
        <button
          onClick={() => setVisibleCount(v => v + 6)}
          className="mb-4 text-sm text-primary hover:underline"
        >
          View more ({repos.length - visibleCount} remaining)
        </button>
      )}

      <div className="space-y-4">
        {visibleRepos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-surface-container-low hover:bg-surface-container rounded-xl p-4 border border-transparent hover:border-primary-fixed-dim transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                {repo.topics?.slice(0, 2).map(topic => (
                  <span key={topic} className="text-xs px-2 py-0.5 bg-surface-container-highest rounded-full text-on-surface-variant">
                    {getTopicEmoji(topic)} {topic}
                  </span>
                ))}
              </div>
              <FaExternalLinkAlt className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {repo.description && (
              <p className="text-sm text-on-surface-variant mb-3 line-clamp-2">{repo.description}</p>
            )}

            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                {repo.stargazers_count}
              </span>
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <FaCodeBranch />
                  {repo.forks_count}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount(v => v + 6)}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-dim transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}