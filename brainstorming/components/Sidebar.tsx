'use client';

import { useState, useEffect } from 'react';
import { SETTING_KEYS } from '@/lib/db/schema';
import type { Website } from '@/lib/db';

const AGENTS = [
  { id: 'assistant', name: 'Assistant', description: 'General helpful assistant' },
  { id: 'brainstorming', name: 'Brainstorming', description: 'Helps turn ideas into designs' },
] as const;

type AgentId = typeof AGENTS[number]['id'];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: Record<string, string>) => void;
  onWebsiteChange: (website: Website | null) => void;
  onAgentChange?: (agentId: AgentId) => void;
}

export default function Sidebar({ isOpen, onClose, onSettingsChange, onWebsiteChange, onAgentChange }: SidebarProps) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);

  useEffect(() => {
    initSession();
  }, []);

  const initSession = async () => {
    try {
      // Ensure session exists first
      await fetch('/api/session');
      // Then fetch settings and websites
      await Promise.all([fetchSettings(), fetchWebsites()]);
    } catch (error) {
      console.error('Failed to init session:', error);
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.settings) {
        setSettings(data.settings);
        onSettingsChange(data.settings);
        if (data.settings[SETTING_KEYS.SELECTED_WEBSITE_ID]) {
          setSelectedWebsiteId(data.settings[SETTING_KEYS.SELECTED_WEBSITE_ID]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/websites');
      const data = await response.json();
      if (data.websites) {
        setWebsites(data.websites);
      }
    } catch (error) {
      console.error('Failed to fetch websites:', error);
    }
  };

  // Update selected website when websites, selectedWebsiteId, or context enabled changes
  useEffect(() => {
    const contextEnabled = settings[SETTING_KEYS.WEBSITE_CONTEXT_ENABLED] !== 'false';
    if (contextEnabled && selectedWebsiteId && websites.length > 0) {
      const website = websites.find(w => String(w.id) === selectedWebsiteId);
      onWebsiteChange(website || null);
    } else {
      onWebsiteChange(null);
    }
  }, [selectedWebsiteId, websites, settings, onWebsiteChange]);

  const updateSetting = async (key: string, value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
    } catch (error) {
      console.error('Failed to update setting:', error);
      // Revert on error
      setSettings(settings);
      onSettingsChange(settings);
    }
  };

  const toggleSetting = (key: string) => {
    const currentValue = settings[key] === 'true';
    updateSetting(key, String(!currentValue));
  };

  const handleWebsiteSelect = (websiteId: string) => {
    setSelectedWebsiteId(websiteId);
    updateSetting(SETTING_KEYS.SELECTED_WEBSITE_ID, websiteId);
  };

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebsiteUrl.trim() || isAddingWebsite) return;

    setIsAddingWebsite(true);
    try {
      const response = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newWebsiteUrl }),
      });

      const data = await response.json();
      if (data.website) {
        setWebsites(prev => {
          const exists = prev.some(w => w.id === data.website.id);
          return exists ? prev : [...prev, data.website];
        });
        setSelectedWebsiteId(String(data.website.id));
        updateSetting(SETTING_KEYS.SELECTED_WEBSITE_ID, String(data.website.id));
        setNewWebsiteUrl('');
      }
    } catch (error) {
      console.error('Failed to add website:', error);
    } finally {
      setIsAddingWebsite(false);
    }
  };

  const handleDeleteWebsite = async (id: number) => {
    try {
      await fetch('/api/websites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      setWebsites(prev => prev.filter(w => w.id !== id));
      if (selectedWebsiteId === String(id)) {
        setSelectedWebsiteId('');
        updateSetting(SETTING_KEYS.SELECTED_WEBSITE_ID, '');
      }
    } catch (error) {
      console.error('Failed to delete website:', error);
    }
  };

  const handleAgentSelect = (agentId: AgentId) => {
    updateSetting(SETTING_KEYS.SELECTED_AGENT, agentId);
    onAgentChange?.(agentId);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded lg:hidden"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-12 bg-gray-800 rounded animate-pulse" />
                <div className="h-12 bg-gray-800 rounded animate-pulse" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Agent Selection */}
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="font-medium text-sm mb-2">Agent</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Choose an assistant mode
                  </p>
                  <div className="space-y-2">
                    {AGENTS.map((agent) => {
                      const isSelected = (settings[SETTING_KEYS.SELECTED_AGENT] || 'assistant') === agent.id;
                      return (
                        <button
                          key={agent.id}
                          onClick={() => handleAgentSelect(agent.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-teal-600 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                          }`}
                        >
                          <p className="font-medium text-sm">{agent.name}</p>
                          <p className={`text-xs ${isSelected ? 'text-teal-100' : 'text-gray-400'}`}>
                            {agent.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Website Context */}
                <div className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">Website Context</p>
                    <button
                      onClick={() => toggleSetting(SETTING_KEYS.WEBSITE_CONTEXT_ENABLED)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings[SETTING_KEYS.WEBSITE_CONTEXT_ENABLED] !== 'false'
                          ? 'bg-teal-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings[SETTING_KEYS.WEBSITE_CONTEXT_ENABLED] !== 'false'
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Add a website to use as context
                  </p>

                  {/* Website controls - only show when enabled */}
                  {settings[SETTING_KEYS.WEBSITE_CONTEXT_ENABLED] !== 'false' && (
                    <>
                      {/* Select existing website */}
                      <select
                        value={selectedWebsiteId}
                        onChange={(e) => handleWebsiteSelect(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">No website selected</option>
                        {websites.map((website) => (
                          <option key={website.id} value={String(website.id)}>
                            {website.name || website.domain}
                          </option>
                        ))}
                      </select>

                      {/* Selected website info */}
                      {selectedWebsiteId && websites.find(w => String(w.id) === selectedWebsiteId) && (
                        <div className="mb-3 p-2 bg-gray-700 rounded-lg">
                          {(() => {
                            const website = websites.find(w => String(w.id) === selectedWebsiteId);
                            if (!website) return null;
                            return (
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: website.mainColor || '#6366f1' }}
                                    />
                                    <p className="text-sm font-medium truncate">{website.name}</p>
                                  </div>
                                  <p className="text-xs text-gray-400 truncate">{website.domain}</p>
                                  {website.description && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{website.description}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDeleteWebsite(website.id)}
                                  className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-red-400 flex-shrink-0"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Add new website */}
                      <form onSubmit={handleAddWebsite} className="flex gap-2">
                        <input
                          type="text"
                          value={newWebsiteUrl}
                          onChange={(e) => setNewWebsiteUrl(e.target.value)}
                          placeholder="Enter website URL..."
                          disabled={isAddingWebsite}
                          className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          type="submit"
                          disabled={!newWebsiteUrl.trim() || isAddingWebsite}
                          className="px-3 py-2 bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                          {isAddingWebsite ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>

                {/* Suggestions Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Suggestions</p>
                    <p className="text-xs text-gray-400">
                      Show message suggestions
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSetting(SETTING_KEYS.SUGGESTIONS_ENABLED)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings[SETTING_KEYS.SUGGESTIONS_ENABLED] === 'true'
                        ? 'bg-teal-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings[SETTING_KEYS.SUGGESTIONS_ENABLED] === 'true'
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Proposal Assistant v0.1
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
