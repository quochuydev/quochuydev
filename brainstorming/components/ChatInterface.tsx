'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageMetadata {
  agentId?: string;
  agentName?: string;
  model?: string;
}

interface AttachedFile {
  name: string;
  type: string;
  size: number;
  url?: string; // Blob URL for uploaded files
  content?: string; // base64 for local preview, text content for text files
  isImage: boolean;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata | null;
  files?: AttachedFile[];
}

interface ChatInterfaceProps {
  onComplete: (result: any) => void;
  suggestionsEnabled?: boolean;
  themeColor?: string | null;
  websiteName?: string | null;
}

export default function ChatInterface({
  onComplete,
  suggestionsEnabled = true,
  themeColor = null,
  websiteName = null,
}: ChatInterfaceProps) {
  // Default color when no theme is set
  const accentColor = themeColor || '#0d9488'; // teal-600
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Load messages from database on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch suggestions when messages change
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Don't fetch if suggestions are disabled or while loading
      if (!suggestionsEnabled || isLoading) {
        setSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversation: messages,
          }),
        });

        const data = await response.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [messages, isLoading, suggestionsEnabled]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  const processFileLocally = async (file: File): Promise<AttachedFile | null> => {
    const isImage = file.type.startsWith('image/');
    const isText =
      file.type.startsWith('text/') ||
      [
        'application/json',
        'application/javascript',
        'application/xml',
      ].includes(file.type) ||
      file.name.match(
        /\.(txt|md|json|js|ts|tsx|jsx|css|html|xml|yaml|yml|csv|log|py|rb|java|c|cpp|h|sh|bash|sql)$/i,
      );

    if (!isImage && !isText) {
      // For other files, just read as text and hope for the best
      try {
        const content = await file.text();
        return {
          name: file.name,
          type: file.type || 'text/plain',
          size: file.size,
          content,
          isImage: false,
        };
      } catch {
        return null;
      }
    }

    return new Promise((resolve) => {
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            type: file.type,
            size: file.size,
            content: e.target?.result as string, // Local preview
            isImage: true,
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      } else {
        file
          .text()
          .then((content) => {
            resolve({
              name: file.name,
              type: file.type || 'text/plain',
              size: file.size,
              content,
              isImage: false,
            });
          })
          .catch(() => resolve(null));
      }
    });
  };

  const uploadFilesToBlob = async (files: File[]): Promise<AttachedFile[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    const data = await response.json();
    return data.files;
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setIsUploading(true);

    try {
      // First, process locally for immediate preview
      const localFiles = await Promise.all(fileArray.map(processFileLocally));
      const validLocalFiles = localFiles.filter((f): f is AttachedFile => f !== null);

      // Add local previews immediately
      setAttachedFiles((prev) => [...prev, ...validLocalFiles]);

      // Then upload to blob storage in background
      const uploadedFiles = await uploadFilesToBlob(fileArray);

      // Update with blob URLs
      setAttachedFiles((prev) => {
        const updated = [...prev];
        // Match and update files by name
        uploadedFiles.forEach((uploaded) => {
          const index = updated.findIndex(
            (f) => f.name === uploaded.name && !f.url
          );
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              url: uploaded.url,
            };
          }
        });
        return updated;
      });
    } catch (error) {
      console.error('Failed to upload files:', error);
      // Keep local previews even if upload fails
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (
      dropZoneRef.current &&
      !dropZoneRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFiles(files);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!currentMessage.trim() && attachedFiles.length === 0) || isLoading)
      return;

    // Build message content with file info
    let messageContent = currentMessage;
    if (attachedFiles.length > 0) {
      const fileDescriptions = attachedFiles
        .map((f) => {
          if (f.isImage) {
            return `[Image: ${f.name}]`;
          }
          const content = f.content || '';
          return `[File: ${f.name}]\n\`\`\`\n${content.slice(0, 10000)}${
            content.length > 10000 ? '\n... (truncated)' : ''
          }\n\`\`\``;
        })
        .join('\n\n');
      messageContent = messageContent
        ? `${messageContent}\n\n${fileDescriptions}`
        : fileDescriptions;
    }

    const userMessage: Message = {
      role: 'user' as const,
      content: messageContent,
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setAttachedFiles([]);
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          conversation: messages,
          files: attachedFiles,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            metadata: data.metadata,
          },
        ]);

        if (data.completed) {
          onComplete(data.toolResult);
        }
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus textarea after sending
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: suggestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSuggestions([]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: suggestion,
          conversation: messages,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            metadata: data.metadata,
          },
        ]);

        if (data.completed) {
          onComplete(data.toolResult);
        }
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = messages;
  const hasMessages = messages.length > 0;

  return (
    <div
      ref={dropZoneRef}
      className={`h-screen flex flex-col bg-gray-50 relative ${
        isDragging ? 'ring-4 ring-inset ring-teal-500' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-white/90 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: accentColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-xl font-medium text-gray-700">Drop files here</p>
            <p className="text-sm text-gray-500 mt-1">
              Images, text files, code, and more
            </p>
          </div>
        </div>
      )}

      {/* Website indicator bar */}
      {websiteName && (
        <div
          className="px-4 py-2 text-white text-sm text-center font-medium"
          style={{ backgroundColor: accentColor }}
        >
          Context: {websiteName}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          // Empty state - centered welcome
          <div className="h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Proposal Assistant
              </h1>
              <p className="text-gray-500 mb-8">
                Start a conversation to brainstorm ideas for your proposal
              </p>
              {websiteName && (
                <p className="text-sm" style={{ color: accentColor }}>
                  Using {websiteName} as knowledge base
                </p>
              )}
            </div>
          </div>
        ) : (
          // Messages list
          <div className="w-full px-4 py-8">
            {displayMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.role === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-full ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor:
                        message.role === 'user' ? '#374151' : accentColor,
                    }}
                  >
                    {message.role === 'user' ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                      </svg>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex flex-col">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gray-700 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      {/* Attached files preview for user messages */}
                      {message.role === 'user' &&
                        message.files &&
                        message.files.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {message.files
                              .filter((f) => f.isImage)
                              .map((file, idx) => (
                                <img
                                  key={idx}
                                  src={file.url || file.content}
                                  alt={file.name}
                                  className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                                />
                              ))}
                            {message.files
                              .filter((f) => !f.isImage)
                              .map((file, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 bg-gray-600 rounded px-2 py-1"
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  <span className="text-xs text-gray-300">
                                    {file.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {/* Hide file content from message text display */}
                          {message.files && message.files.length > 0
                            ? message.content.split(
                                /\n\n\[(?:Image|File): /,
                              )[0] || ''
                            : message.content}
                        </div>
                      )}
                    </div>
                    {/* Agent metadata label */}
                    {message.role === 'assistant' &&
                      message.metadata?.agentName && (
                        <div className="mt-1 ml-1 text-xs text-gray-400 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{message.metadata.agentName}</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                    </svg>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: accentColor,
                          animationDelay: '0ms',
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: accentColor,
                          animationDelay: '150ms',
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: accentColor,
                          animationDelay: '300ms',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="w-full">
          {/* Suggestions */}
          {suggestionsEnabled && suggestions.length > 0 && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors truncate max-w-[300px]"
                  title={suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Loading suggestions indicator */}
          {suggestionsEnabled && isLoadingSuggestions && !isLoading && (
            <div className="flex gap-2 mb-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-32 bg-gray-100 rounded-full animate-pulse"
                />
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Attached files preview */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`relative group flex items-center gap-2 bg-gray-100 border rounded-lg px-3 py-2 ${
                      file.url ? 'border-gray-200' : 'border-amber-300'
                    }`}
                  >
                    {file.isImage ? (
                      <div className="relative">
                        <img
                          src={file.url || file.content}
                          alt={file.name}
                          className={`w-10 h-10 object-cover rounded ${!file.url ? 'opacity-70' : ''}`}
                        />
                        {!file.url && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.url ? formatFileSize(file.size) : 'Uploading...'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative flex gap-2 bg-gray-100 rounded-2xl p-2 items-center">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />

              {/* Attachment button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              <textarea
                ref={textareaRef}
                value={currentMessage}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Message Proposal Assistant..."
                disabled={isLoading}
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none max-h-[200px]"
                style={{ minHeight: '44px' }}
              />
              <button
                type="submit"
                disabled={
                  (!currentMessage.trim() && attachedFiles.length === 0) ||
                  isLoading ||
                  isUploading ||
                  (attachedFiles.length > 0 && attachedFiles.some((f) => f.isImage && !f.url))
                }
                className="flex-shrink-0 p-2 rounded-xl text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                style={{
                  backgroundColor:
                    (!currentMessage.trim() && attachedFiles.length === 0) ||
                    isLoading ||
                    isUploading ||
                    (attachedFiles.length > 0 && attachedFiles.some((f) => f.isImage && !f.url))
                      ? undefined
                      : accentColor,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Press Enter to send, Shift+Enter for new line. Drag & drop files
              or click the attachment icon.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
