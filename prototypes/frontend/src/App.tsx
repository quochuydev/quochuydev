import React, { useState, useEffect, useRef } from 'react';
import {
  SandpackCodeEditor,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .app-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    font-size: 18px;
  }

  .app-title {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }

  .refresh-btn {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .refresh-btn:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }

  .main-content {
    display: flex;
    height: calc(100vh - 64px);
  }

  .chat-section {
    width: 25%;
    min-width: 280px;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .chat-header {
    background: #f9fafb;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message {
    max-width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .user-message {
    background: #3b82f6;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .ai-message {
    background: #f3f4f6;
    color: #374151;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .thinking-message {
    background: #fef3c7;
    color: #92400e;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chat-input-container {
    border-top: 1px solid #e5e7eb;
    padding: 16px;
  }

  .chat-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    min-height: 60px;
  }

  .chat-input:focus {
    border-color: #3b82f6;
  }

  .chat-send-btn {
    width: 100%;
    margin-top: 8px;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .chat-send-btn:hover:not(:disabled) {
    background: #2563eb;
  }

  .chat-send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .editor-section {
    width: 25%;
    min-width: 280px;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .section-header {
    background: #f9fafb;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .preview-section {
    width: 50%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .preview-header {
    background: #f9fafb;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .preview-title {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .open-new-tab {
    background: #3b82f6;
    color: white;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .open-new-tab:hover {
    background: #2563eb;
  }

  .loading-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }

  .loading-content {
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  .error-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  }

  .error-card {
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
  }

  .error-icon {
    width: 64px;
    height: 64px;
    background: #ef4444;
    border-radius: 50%;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 28px;
    font-weight: bold;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .typing-indicator {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .retry-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .retry-button:hover:not(:disabled) {
    background: #2563eb;
  }

  .retry-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .message-with-retry {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

interface Message {
  id: string;
  type: 'user' | 'ai' | 'thinking';
  content: string;
  canRetry?: boolean;
  failedDescription?: string;
}

function App() {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [dependencies, setDependencies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hello! I'm here to help you modify your project. What would you like to change or add?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjectFiles();
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchProjectFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/sandpack-files');
      const data = await response.json();

      if (data.success) {
        setFiles(data.files);
        setDependencies(data.dependencies);
      } else {
        setError(data.error || 'Failed to fetch project files');
      }
    } catch (err) {
      setError(
        'Error connecting to backend. Make sure the backend server is running on localhost:8000',
      );
      console.error('Error fetching project files:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async (description: string, addToChat: boolean = true) => {
    try {
      setIsGenerating(true);

      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          project_context: files,
          request_type: 'complex',
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the files after successful generation
        await fetchProjectFiles();

        // Add success message
        if (addToChat) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'ai',
              content: `✅ ${data.explanation}\n\nThe code has been updated! Check the editor and preview to see the changes.`,
            },
          ]);
        }
      } else {
        // Add error message with retry option
        if (addToChat) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'ai',
              content: `❌ Failed to generate code: ${
                data.explanation || 'Unknown error'
              }`,
              canRetry: true,
              failedDescription: description,
            },
          ]);
        }
      }
    } catch (err) {
      console.error('Error generating code:', err);
      if (addToChat) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'ai',
            content:
              '❌ Error connecting to backend. Please make sure the backend server is running on localhost:8000',
            canRetry: true,
            failedDescription: description,
          },
        ]);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: userMessage,
      },
    ]);

    // Add thinking message
    const thinkingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        type: 'thinking',
        content: '🤔 Thinking...',
      },
    ]);

    // Generate code
    await generateCode(userMessage);

    // Remove thinking message
    setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetry = async (failedDescription: string) => {
    if (!failedDescription.trim() || isGenerating) return;

    // Add thinking message
    const thinkingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        type: 'thinking',
        content: '🤔 Retrying...',
      },
    ]);

    // Generate code again
    await generateCode(failedDescription);

    // Remove thinking message
    setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId));
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-container">
          <div className="loading-content">
            <div className="spinner"></div>
            <h2
              style={{
                fontSize: '24px',
                color: '#374151',
                marginBottom: '8px',
              }}
            >
              Loading Sandbox
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Fetching project files from backend...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">!</div>
            <h2 style={{ color: '#111827', marginBottom: '12px' }}>
              Connection Error
            </h2>
            <p
              style={{
                color: '#6b7280',
                marginBottom: '24px',
                lineHeight: '1.6',
              }}
            >
              {error}
            </p>
            <button
              onClick={fetchProjectFiles}
              className="refresh-btn"
              style={{ width: '100%', padding: '12px' }}
            >
              Retry Connection
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <div className="logo-section">
            <div className="logo">{`{ }`}</div>
            <h1 className="app-title">Prototype Sandbox</h1>
          </div>
          <button className="refresh-btn" onClick={fetchProjectFiles}>
            Refresh Files
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left: Chat */}
          <div className="chat-section">
            <div className="chat-header">
              <span>💬</span>
              <span>AI Assistant</span>
            </div>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.type}-message ${
                    message.type === 'thinking' ? 'typing-indicator' : ''
                  }`}
                >
                  <div className="message-with-retry">
                    <span>{message.content}</span>
                    {message.canRetry && message.failedDescription && (
                      <button
                        className="retry-button"
                        onClick={() => handleRetry(message.failedDescription!)}
                        disabled={isGenerating}
                      >
                        🔄 Retry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                placeholder="Describe what you want to change or add to the project..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                disabled={isGenerating}
              />
              <button
                className="chat-send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Send'}
              </button>
            </div>
          </div>

          {/* Middle: Code Editor */}
          <div className="editor-section">
            <div className="section-header">
              <span>📝</span>
              <span>Code Editor</span>
            </div>
            <div style={{ flex: 1 }}>
              <SandpackProvider
                template="react-ts"
                customSetup={{
                  dependencies: dependencies,
                }}
                files={files}
              >
                <SandpackCodeEditor
                  style={{ height: '100%' }}
                  showTabs={true}
                  showLineNumbers={true}
                  showInlineErrors={true}
                />
              </SandpackProvider>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="preview-section">
            <div className="preview-header">
              <div className="preview-title">
                <span>🌐</span>
                <span>Live Preview</span>
              </div>
              <a
                href={import.meta.env.VITE_DEV_SERVER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="open-new-tab"
              >
                Open in New Tab
              </a>
            </div>
            <iframe
              src={import.meta.env.VITE_DEV_SERVER_URL}
              style={{
                flex: 1,
                border: 'none',
                width: '100%',
                background: 'white',
              }}
              title="Project Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
