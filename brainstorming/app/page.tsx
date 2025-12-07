'use client';

import { useState, useCallback } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ProposalView from '@/components/ProposalView';
import Sidebar from '@/components/Sidebar';
import { SETTING_KEYS } from '@/lib/db/schema';
import type { Website } from '@/lib/db';

export default function Home() {
  const [proposalResult, setProposalResult] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);

  const handleComplete = (result: any) => {
    setProposalResult(result);
  };

  const handleReset = () => {
    setProposalResult(null);
  };

  const handleWebsiteChange = useCallback((website: Website | null) => {
    setSelectedWebsite(website);
  }, []);

  const suggestionsEnabled = settings[SETTING_KEYS.SUGGESTIONS_ENABLED] !== 'false';
  const themeColor = selectedWebsite?.mainColor || null;

  if (proposalResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProposalView result={proposalResult} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSettingsChange={setSettings}
        onWebsiteChange={handleWebsiteChange}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Menu button for mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ChatInterface
          onComplete={handleComplete}
          suggestionsEnabled={suggestionsEnabled}
          themeColor={themeColor}
          websiteName={selectedWebsite?.name || null}
        />
      </div>
    </div>
  );
}
