import { Octokit } from '@octokit/rest';

export interface CommitResult {
  filename: string;
  url: string;
  commitUrl: string;
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
  _token?: string, // Optional parameter for backward compatibility
): Promise<CommitResult> {
  // Use environment token if no token provided
  const token = _token || getGitHubToken();
  const octokit = new Octokit({ auth: token });

  // Generate filename
  const date = new Date().toISOString().split('T')[0];
  const sanitizedClient = clientName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const sanitizedProject = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `${date}-${sanitizedClient}-${sanitizedProject}.md`;
  const path = `proposals/${filename}`;

  // Check if file exists
  let sha: string | undefined;
  try {
    const { data: existingFile } = await octokit.repos.getContent({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      path,
    });
    sha = (existingFile as any).sha;
  } catch (error) {
    // File doesn't exist, that's fine
  }

  // Create or update file
  const { data: file } = await octokit.repos.createOrUpdateFileContents({
    owner: process.env.GITHUB_REPO_OWNER!,
    repo: process.env.GITHUB_REPO_NAME!,
    path,
    message: `Add proposal: ${clientName} - ${projectName}`,
    content: Buffer.from(content).toString('base64'),
    sha,
  });

  // Return GitHub Pages URL
  return {
    filename,
    url: `https://${process.env.GITHUB_REPO_OWNER}.github.io/${process.env.GITHUB_REPO_NAME}/${path}`,
    commitUrl: file.commit.html_url as string,
  };
}
