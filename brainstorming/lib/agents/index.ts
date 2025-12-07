import { BRAINSTORMING_AGENT } from './brainstorming';

export const ASSISTANT_SYSTEM_PROMPT = `You are a helpful AI assistant. You can help with a variety of tasks including answering questions, having conversations, and assisting with creative and analytical work.

Be concise, helpful, and friendly. If you don't know something, say so honestly.`;

export const AGENTS = {
  assistant: {
    id: 'assistant',
    name: 'Assistant',
    description: 'General helpful assistant',
    systemPrompt: ASSISTANT_SYSTEM_PROMPT,
  },
  brainstorming: BRAINSTORMING_AGENT,
} as const;

export type AgentId = keyof typeof AGENTS;

export function getAgent(agentId: AgentId) {
  return AGENTS[agentId];
}

export { BRAINSTORMING_AGENT, BRAINSTORMING_SYSTEM_PROMPT } from './brainstorming';
