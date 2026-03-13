"use client";

import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

import type { Messages } from "@/types";

type TranscriptProps = {
  messages: Messages[];
  currentMessage: string;
  currentUserMessage: string;
};

const isUserRole = (role: string) => role.toLowerCase() === "user";

export default function Transcript({
  messages,
  currentMessage,
  currentUserMessage,
}: TranscriptProps): React.JSX.Element {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, currentMessage, currentUserMessage]);

  const isEmpty =
    messages.length === 0 &&
    currentMessage.trim().length === 0 &&
    currentUserMessage.trim().length === 0;

  if (isEmpty) {
    return (
      <div className="transcript-container">
        <div className="transcript-empty">
          <Mic className="size-10 text-[#212a3b]" aria-hidden="true" />
          <p className="transcript-empty-text">No conversation yet</p>
          <p className="transcript-empty-hint">Click the mic button above to start talking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transcript-container">
      <div className="transcript-messages">
        {messages.map((message, index) => {
          const userMessage = isUserRole(message.role);

          return (
            <div
              key={`${message.role}-${index}-${message.content.slice(0, 20)}`}
              className={`transcript-message ${
                userMessage ? "transcript-message-user" : "transcript-message-assistant"
              }`}
            >
              <div
                className={`transcript-bubble ${
                  userMessage ? "transcript-bubble-user" : "transcript-bubble-assistant"
                }`}
              >
                {message.content}
              </div>
            </div>
          );
        })}

        {currentUserMessage.trim() ? (
          <div className="transcript-message transcript-message-user">
            <div className="transcript-bubble transcript-bubble-user">
              {currentUserMessage}
              <span className="transcript-cursor" aria-hidden="true" />
            </div>
          </div>
        ) : null}

        {currentMessage.trim() ? (
          <div className="transcript-message transcript-message-assistant">
            <div className="transcript-bubble transcript-bubble-assistant">
              {currentMessage}
              <span className="transcript-cursor" aria-hidden="true" />
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

