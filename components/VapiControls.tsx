"use client";
import React from "react";
import { useVapi } from "@/hooks/useVapi";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";
import type { IBook } from "@/types";

import Transcript from "@/components/Transcript";

type VapiControlsProps = {
  book: IBook;
};

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const maxDurationSeconds = 600; // 10 minutes

const VapiControls = ({ book }: VapiControlsProps): React.JSX.Element => {
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
  } = useVapi(book);

  const statusDisplay = {
    color:
      status === "speaking"
        ? "vapi-status-dot-speaking"
        : status === "thinking"
        ? "vapi-status-dot-thinking"
        : status === "listening"
        ? "vapi-status-dot-listening"
        : status === "connecting" || status === "starting"
        ? "vapi-status-dot-connecting"
        : "vapi-status-dot-ready",
    label:
      status === "speaking"
        ? "Speaking"
        : status === "thinking"
        ? "Thinking"
        : status === "listening"
        ? "Listening"
        : status === "connecting" || status === "starting"
        ? "Connecting"
        : "Ready",
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="vapi-header-card">
        <div className="vapi-cover-wrapper">
          <Image
            src={book.coverURL || "/assets/book-cover.svg"}
            alt={book.title}
            width={120}
            height={180}
            className="vapi-cover-image w-30! h-auto!"
            priority
          />
          <div className="vapi-mic-wrapper relative">
            {isActive && (status === "speaking" || status === "thinking") && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
            )}
            <button
              onClick={isActive ? stop : start}
              disabled={status === "connecting"}
              className={`vapi-mic-btn shadow-md w-15! h-15! z-10 ${
                isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"
              }`}
              aria-label={
                isActive
                  ? "Stop voice conversation"
                  : "Start voice conversation"
              }
            >
              {isActive ? (
                  <Mic className="size-7 text-white" />
              ) : (
                  <MicOff className="size-7 text-[#212a3b]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 justify-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
              {book.title}
            </h1>
            <p className="text-[#3d485e] font-medium">by {book.author}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="vapi-status-indicator">
              <span className={`vapi-status-dot ${statusDisplay.color}`} />
              <span className="vapi-status-text">{statusDisplay.label}</span>
            </div>

            <div className="vapi-status-indicator">
              <span className="vapi-status-text">
                Voice: {book.persona || "Daniel"}
              </span>
            </div>

            <div className="vapi-status-indicator">
              <span className="vapi-status-text">
                 {formatDuration(duration)}/{formatDuration(maxDurationSeconds)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="vapi-transcript-wrapper">
        <Transcript
          messages={messages}
          currentMessage={currentMessage}
          currentUserMessage={currentUserMessage}
        />
      </div>
    </div>
  );
};
export default VapiControls;
