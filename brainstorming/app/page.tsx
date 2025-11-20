'use client';

import { useState, useEffect } from 'react';
import JobPaste from '@/components/JobPaste';
import ChatInterface from '@/components/ChatInterface';
import ProposalView from '@/components/ProposalView';

type AppState = 'paste' | 'chat' | 'complete';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('paste');
  const [jobDescription, setJobDescription] = useState('');
  const [proposalResult, setProposalResult] = useState<any>(null);

  const handleStart = (description: string) => {
    setJobDescription(description);
    setAppState('chat');
  };

  const handleComplete = (result: any) => {
    setProposalResult(result);
    setAppState('complete');
  };

  const handleReset = () => {
    setAppState('paste');
    setJobDescription('');
    setProposalResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-xl font-bold text-secondary-900">
            Upwork Proposal Assistant
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {appState === 'paste' && <JobPaste onStart={handleStart} />}
        {appState === 'chat' && (
          <ChatInterface
            jobDescription={jobDescription}
            onComplete={handleComplete}
          />
        )}
        {appState === 'complete' && proposalResult && (
          <ProposalView result={proposalResult} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
