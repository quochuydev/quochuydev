// test-simple.js - Minimal test for GitHub createOrUpdateFileContents
require('dotenv').config();

const { Octokit } = require('@octokit/rest');

async function testSimpleCommit() {
  console.log('🧪 Testing createOrUpdateFileContents only...\n');

  // Get environment variables
  const token = process.env.GITHUB_PERSONAL_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  console.log(`Token: ${token ? 'SET' : 'NOT SET'}`);
  console.log(`Owner: ${owner}`);
  console.log(`Repo: ${repo}`);

  if (!token || !owner || !repo) {
    console.error('❌ Missing environment variables');
    return;
  }

  try {
    // Initialize Octokit
    const octokit = new Octokit({ auth: token });
    console.log('✅ Octokit initialized');

    // Create test content
    const testContent = `# Simple Test Proposal

This is a simple test file.

Date: ${new Date().toISOString()}
`;

    const filename = `simple-test-${Date.now()}.md`;

    console.log(`Creating file: ${filename}`);

    // ONLY test createOrUpdateFileContents
    const { data: file } = await octokit.repos.createOrUpdateFileContents({
      owner: owner,
      repo: repo,
      path: filename,
      message: 'Simple test commit',
      content: Buffer.from(testContent).toString('base64'),
    });

    console.log('✅ File created successfully!');
    console.log(`Commit: ${file.commit.html_url}`);
    console.log(`File URL: https://github.com/${owner}/${repo}/blob/main/${filename}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
  }
}

testSimpleCommit();