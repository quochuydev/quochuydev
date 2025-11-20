import Anthropic from '@anthropic-ai/sdk';
import { commitToGitHub } from '@/lib/github';

console.log(`debug: Anthropic API Key: ${process.env.ANTHROPIC_API_KEY}`);
console.log(`debug: Anthropic Base URL: ${process.env.ANTHROPIC_BASE_URL}`);

const anthropic = new Anthropic({
  baseURL: process.env.ANTHROPIC_BASE_URL,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ToolUse {
  type: 'tool_use';
  name: string;
  input: any;
}

const commitToGithubTool: Anthropic.Tool = {
  name: 'commit_to_github',
  description: 'Commit the final proposal to GitHub repository',
  input_schema: {
    type: 'object',
    properties: {
      clientName: {
        type: 'string',
        description: 'Client company or person name',
      },
      projectName: {
        type: 'string',
        description: 'Project title or description',
      },
      content: {
        type: 'string',
        description: 'Complete proposal markdown content',
      },
    },
    required: ['clientName', 'projectName', 'content'],
  },
};

export async function POST(request: Request) {
  try {
    const { message, conversation } = await request.json();

    const messages: Message[] = [
      ...conversation,
      {
        role: 'user',
        content: message,
      },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 40000,
      system: `Use and follow the brainstorming skill exactly as written

---

name: brainstorming
description: Use when creating or developing, before writing code or implementation plans - refines rough ideas into fully-formed designs through collaborative questioning, alternative exploration, and incremental validation. Don't use during clear 'mechanical' processes

---

# Brainstorming Ideas Into Designs

## Overview

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections (200-300 words), checking after each section whether it looks right so far.

## The Process

**Understanding the idea:**

- Check out the current project state first (files, docs, recent commits)
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible, but open-ended is fine too
- Only one question per message - if a topic needs more exploration, break it into multiple questions
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**

- Propose 2-3 different approaches with trade-offs
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why

**Presenting the design:**

- Once you believe you understand what you're building, present the design
- Break it into sections of 200-300 words
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling
- Be ready to go back and clarify if something doesn't make sense

## After the Design

**Documentation:**

- Write the validated design to markdown format for client presentation
- Use elements of style: writing clearly and concisely
- Create comprehensive proposal document

**Implementation (if continuing):**

- Ask: "Ready to set up for implementation?"

## Key Principles

- **One question at a time** - Don't overwhelm with multiple questions
- **Multiple choice preferred** - Easier to answer than open-ended when possible
- **YAGNI ruthlessly** - Remove unnecessary features from all designs
- **Explore alternatives** - Always propose 2-3 approaches before settling
- **Incremental validation** - Present design in sections, validate each
- **Be flexible** - Go back and clarify when something doesn't make sense

You are helping create an Upwork proposal. When you have enough information, generate a complete proposal in markdown format and commit it using the commit_to_github tool.`,
      messages: messages.map((msg) => ({
        role: (msg.role || 'user') as 'user' | 'assistant',
        content: msg.content,
      })),
      tools: [commitToGithubTool],
    });

    console.log(`debug:response`, response);

    const content = response.content[0];
    let toolResult = null;
    let completed = false;

    // Handle tool use
    if (content.type === 'tool_use' && content.name === 'commit_to_github') {
      try {
        toolResult = await commitToGitHub(
          content.input.content,
          content.input.clientName,
          content.input.projectName,
        );
        completed = true;
      } catch (error) {
        console.error('GitHub commit error:', error);

        return Response.json(
          {
            error: 'Failed to commit proposal to GitHub',
          },
          {
            status: 500,
          },
        );
      }
    }

    // Return response
    return Response.json({
      reply: content.type === 'text' ? content.text : '',
      conversation: [
        ...messages,
        {
          role: 'assistant' as const,
          content:
            content.type === 'text'
              ? content.text
              : 'Proposal created and committed successfully!',
        },
      ],
      completed,
      toolResult,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
