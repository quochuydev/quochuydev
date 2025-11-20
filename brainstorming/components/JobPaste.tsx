'use client';

import { useState } from 'react';

interface JobPasteProps {
  onStart: (jobDescription: string) => void;
}

export default function JobPaste({ onStart }: JobPasteProps) {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onStart(jobDescription);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary-700 mb-4">
          Upwork Proposal Assistant
        </h1>
        <p className="text-lg text-secondary-500">
          Paste the Upwork job description and let AI help you create a winning
          proposal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-64 border border-secondary-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Paste the complete Upwork job description here..."
            required
          />
          <div className="mt-2 text-sm text-secondary-500">
            {jobDescription.length} characters
          </div>
        </div>

        <button
          type="submit"
          disabled={!jobDescription.trim()}
          className="w-full font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed
            disabled:bg-gray-200 disabled:text-gray-500
            bg-primary-500 hover:bg-primary-600 hover:shadow-md
            border border-primary-600 disabled:border-gray-300 cursor-pointer"
        >
          Start Brainstorming
        </button>
      </form>
    </div>
  );
}
