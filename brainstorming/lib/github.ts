import { Octokit } from '@octokit/rest';

export interface CommitResult {
  filename: string;
  url: string;
  rawUrl: string;
  commitUrl: string;
  githubViewUrl: string;
}

export function getGitHubToken(): string {
  const token = process.env.GITHUB_PERSONAL_TOKEN;
  if (!token) {
    throw new Error('GITHUB_PERSONAL_TOKEN environment variable is required');
  }
  return token;
}

export async function commitToGitHub(
  content: string,
  clientName: string,
  projectName: string,
): Promise<CommitResult> {
  // Use environment token if no token provided
  const token = getGitHubToken();
  const octokit = new Octokit({ auth: token });

  // Generate filename
  const date = new Date().toISOString().split('T')[0];
  const sanitizedClient = clientName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const sanitizedProject = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `${date}-${sanitizedClient}-${sanitizedProject}.md`;
  const path = `${filename}`;

  // Create or update file
  const { data: file } = await octokit.repos.createOrUpdateFileContents({
    owner: process.env.GITHUB_REPO_OWNER!,
    repo: process.env.GITHUB_REPO_NAME!,
    path: `${filename}`,
    message: `Add proposal: ${clientName} - ${projectName}`,
    content: Buffer.from(content).toString('base64'),
  });

  // Return GitHub Pages URL
  return {
    filename,
    url: `https://${process.env.GITHUB_REPO_OWNER}.github.io/${process.env.GITHUB_REPO_NAME}/${path}`,
    commitUrl: file.commit.html_url as string,
  };
}
