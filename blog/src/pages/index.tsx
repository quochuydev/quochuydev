import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Portfolio from './portfolio.mdx';

import JobPost021989677245959853379 from './jobs/021989677245959853379.mdx';

const jobs: Record<string, React.ComponentType> = {
  '021989677245959853379': JobPost021989677245959853379,
};

function HomePage() {
  return <Portfolio />;
}

export default function IndexPage() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  const [JobComponent, setJobComponent] = useState<React.ComponentType | null>(
    null,
  );
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!jobId) return;

    if (jobs[jobId]) {
      setJobComponent(() => jobs[jobId]);
    } else {
      setError(`Job post not found: ${jobId}`);
    }
  }, [jobId]);

  if (jobId) {
    if (error) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-2">
              Job Not Found
            </h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      );
    }

    if (!JobComponent) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <JobComponent />
      </div>
    );
  }

  return <HomePage />;
}
