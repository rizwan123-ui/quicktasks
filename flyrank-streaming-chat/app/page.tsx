"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (!isAtBottom) return;

    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, status, isAtBottom]);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const distance =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setIsAtBottom(distance < 80);
  }

  function jumpToLatest() {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    setIsAtBottom(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || isStreaming) return;

    sendMessage({ text });
    setInput("");
    setIsAtBottom(true);
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-100 p-3 sm:p-6">
      <section className="flex h-[calc(100vh-24px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:h-[calc(100vh-48px)]">
        
        <header className="border-b border-zinc-200 px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-zinc-900">
            FlyRank Streaming AI Chat
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Week 4 · FE-06 · Frontend AI Engineering
          </p>
        </header>

        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto px-4 py-5 sm:px-6"
          >
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <div className="text-3xl">✨</div>

                  <h2 className="mt-3 font-medium text-zinc-800">
                    Start a streaming conversation
                  </h2>

                  <p className="mt-1 max-w-sm text-sm text-zinc-500">
                    Ask a question and watch the AI response appear as it is
                    generated.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((message) => {
                const text = message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("");

                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
                        isUser
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-900"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isAtBottom && (
            <button
              type="button"
              onClick={jumpToLatest}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow"
            >
              Jump to latest ↓
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-zinc-200 bg-white p-3 sm:p-4"
        >
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Message the AI..."
              rows={1}
              disabled={isStreaming}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-500 disabled:bg-zinc-100"
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={() => stop()}
                className="h-11 rounded-xl bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-11 rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}