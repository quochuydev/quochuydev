interface ProposalViewProps {
  result: {
    filename: string;
    url: string;
    commitUrl: string;
  };
  onReset: () => void;
}

export default function ProposalView({ result, onReset }: ProposalViewProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-6">
          <svg
            className="h-8 w-8 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          Proposal Created Successfully!
        </h2>
        <p className="text-secondary-600 mb-8">
          Your professional proposal has been generated and saved to GitHub.
        </p>

        {/* File Info */}
        <div className="bg-secondary-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-secondary-600 mb-2">
            <span className="font-medium">Filename:</span> {result.filename}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            View Proposal Online
          </a>

          <a
            href={result.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 font-medium px-6 py-3 rounded-lg transition-colors"
          >
            View on GitHub
          </a>

          <button
            onClick={onReset}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Create Another Proposal
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Next Steps:</strong> Copy the URL from the proposal page and share it with your Upwork client.
          </p>
        </div>
      </div>
    </div>
  );
}