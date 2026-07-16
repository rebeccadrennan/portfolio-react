import React, { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useVoiceAssistant } from "@hooks/useVoiceAssistant";
import "./style.css";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

type VoiceStage =
  | "idle"
  | "requesting-permission"
  | "listening"
  | "transcribing"
  | "generating-response"
  | "generating-speech"
  | "error";

export default function PortfolioAssistant() {
  const apiBaseUrl =
    (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "http://localhost:8000";
  const chatEndpoint = `${apiBaseUrl.replace(/\/$/, "")}/chat`;
  const messagesViewportRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I’m Rebecca’s AI Portfolio Assistant. Ask me about her React, Python, AI, full-stack or project experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceRepliesEnabled, setVoiceRepliesEnabled] = useState(true);
  const [voiceStage, setVoiceStage] = useState<VoiceStage>("idle");
  const [voiceStatusMessage, setVoiceStatusMessage] = useState<string | null>(null);

  const {
    isRecording,
    recordingSeconds,
    voiceError,
    setVoiceError,
    startRecording,
    stopRecording,
    clearVoiceError,
  } = useVoiceAssistant();

  const suggestedQuestions = [
    "What AI projects has Rebecca built?",
    "Tell me about her React experience",
    "How has she used Python?",
    "What full-stack work has she done?",
  ];

  const hasPriorAssistantReply = messages.some(
    (message, index) => message.role === "assistant" && index > 0
  );

  const isVoiceBusy =
    voiceStage === "requesting-permission" ||
    voiceStage === "listening" ||
    voiceStage === "transcribing" ||
    voiceStage === "generating-response" ||
    voiceStage === "generating-speech";
  const isBusy = loading || isVoiceBusy;

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const submitChatMessage = async (
    messageText: string,
    options?: { includeUserMessage?: boolean; bypassBusyCheck?: boolean }
  ) => {
    const trimmed = messageText.trim();
    if (!trimmed || (isBusy && !options?.bypassBusyCheck)) return;

    const includeUserMessage = options?.includeUserMessage ?? true;

    clearVoiceError();
    setVoiceStage("generating-response");
    setVoiceStatusMessage("Generating the assistant response...");

    if (includeUserMessage) {
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInput("");
    }

    setLoading(true);

    try {
      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error("Assistant service is unavailable");
      }

      const data: { reply?: string } = await res.json();
      const replyText = data.reply ?? "I couldn’t generate a reply.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: replyText,
        },
      ]);

      setLoading(false);

      if (!voiceRepliesEnabled) {
        setVoiceStage("idle");
        setVoiceStatusMessage(null);
        return;
      }

      setVoiceStage("generating-speech");
      setVoiceStatusMessage("Generating speech for the assistant reply...");

      try {
        const speechSynthesizer = window.speechSynthesis;

        if (typeof window === "undefined" || typeof SpeechSynthesisUtterance === "undefined") {
          throw new Error("Speech synthesis is not supported");
        }

        if (!speechSynthesizer) {
          throw new Error("Speech synthesis is not available");
        }

        speechSynthesizer.cancel();

        setVoiceStage("generating-speech");
        setVoiceStatusMessage("Speaking the assistant reply...");

        await new Promise<void>((resolve, reject) => {
          const utterance = new SpeechSynthesisUtterance(replyText);
          utterance.rate = 1;
          utterance.pitch = 1;
          utterance.onend = () => resolve();
          utterance.onerror = () => reject(new Error("Speech synthesis failed"));
          speechSynthesizer.speak(utterance);
        });

        setVoiceStage("idle");
        setVoiceStatusMessage(null);
      } catch {
        setVoiceError("Voice output could not be generated. The written reply is still available.");
        setVoiceStage("error");
        setVoiceStatusMessage("Voice output is unavailable.");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn’t reach the assistant just now. Please try again in a moment.",
        },
      ]);
      setVoiceStage("idle");
      setVoiceStatusMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitChatMessage(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitChatMessage(input);
    }
  };

  const startVoiceRecording = async () => {
    if (isBusy) {
      return;
    }

    clearVoiceError();
    setVoiceStage("requesting-permission");
    setVoiceStatusMessage("Requesting microphone permission...");

    try {
      await startRecording();
      setVoiceStage("listening");
      setVoiceStatusMessage("Listening...");
    } catch {
      setVoiceStage("error");
      setVoiceStatusMessage("Microphone access is required for voice input.");
    }
  };

  const stopVoiceRecording = async () => {
    if (!isRecording) {
      return;
    }

    setVoiceStage("transcribing");
    setVoiceStatusMessage("Transcribing your question...");

    const transcriptText = await stopRecording();

    if (!transcriptText) {
      setVoiceStage("error");
      setVoiceStatusMessage("Recording stopped before speech was captured.");
      return;
    }

    try {
      const transcript = transcriptText.trim();

      if (!transcript) {
        throw new Error("Empty transcript");
      }

      setMessages((prev) => [...prev, { role: "user", text: transcript }]);
      await submitChatMessage(transcript, {
        includeUserMessage: false,
        bypassBusyCheck: true,
      });
      setVoiceStage("idle");
      setVoiceStatusMessage(null);
    } catch {
      setVoiceError("Voice transcription failed. You can try again or type your question.");
      setVoiceStage("error");
      setVoiceStatusMessage("Transcription failed.");
    }
  };

  const handleMicButtonClick = async () => {
    if (isRecording) {
      await stopVoiceRecording();
      return;
    }

    await startVoiceRecording();
  };

  const toggleVoiceReplies = () => {
    const nextValue = !voiceRepliesEnabled;
    setVoiceRepliesEnabled(nextValue);

    if (!nextValue) {
      window.speechSynthesis.cancel();
      setVoiceStage("idle");
      setVoiceStatusMessage("Voice replies are muted.");
      return;
    }

    setVoiceStatusMessage("Voice replies are enabled.");
  };

  const voiceStatusCopy =
    voiceStage === "listening"
      ? `Recording ${formatRecordingTime(recordingSeconds)}`
      : (voiceStatusMessage ??
        (voiceRepliesEnabled ? "Voice mode ready." : "Voice replies are muted."));

  const voiceToggleLabel = voiceRepliesEnabled ? "Disable voice replies" : "Enable voice replies";
  const voiceToggleText = voiceRepliesEnabled ? "Voice replies on" : "Voice replies off";
  const micButtonLabel = isRecording ? "Stop voice recording" : "Start voice recording";

  return (
    <div className="aiAssistantSection">
      <div className="section-heading">
        <p className="about-eyebrow">Portfolio Assistant</p>
      </div>
      <section id="assistant-chat">
        <div className="assistantFeatureCard">
          <div className="assistantHeader">
            <a className="assistantCta" href="#featured-projects">
              <span className="assistantCtaTitle">✨ Interested in how I built this?</span>
              <span className="assistantCtaBody">
                Explore the architecture, backend workflow, prompt design and deployment approach
                behind this AI feature.
              </span>
              <span className="assistantCtaAction">View Project →</span>
            </a>
          </div>

          <div className="chatPanel">
            <div className="voiceControls" aria-label="Voice options">
              <button
                type="button"
                className={`voiceButton ${isRecording ? "isListening" : ""}`.trim()}
                onClick={() => void handleMicButtonClick()}
                aria-label={micButtonLabel}
                disabled={loading || voiceStage === "requesting-permission"}
              >
                {isRecording ? "Stop" : "Voice"}
              </button>

              <button
                type="button"
                className={`voiceToggleButton ${voiceRepliesEnabled ? "isEnabled" : "isDisabled"}`.trim()}
                onClick={toggleVoiceReplies}
                aria-label={voiceToggleLabel}
                disabled={loading}
              >
                {voiceToggleText}
              </button>
            </div>

            <div className="voiceStatus" aria-live="polite">
              <span className="voiceStatusBadge">Voice</span>
              <p className="voiceStatusCopy">{voiceStatusCopy}</p>
              {voiceError ? <p className="voiceStatusError">{voiceError}</p> : null}
            </div>

            <div className="messagesViewport" aria-live="polite" ref={messagesViewportRef}>
              {messages.map((msg, index) => (
                <article
                  key={`${msg.role}-${index}`}
                  className={`messageGroup ${msg.role === "user" ? "userGroup" : "assistantGroup"}`}
                >
                  <p className="messageLabel">
                    {msg.role === "user" ? "You" : "Rebecca’s Assistant"}
                  </p>
                  <div
                    className={`messageBubble ${
                      msg.role === "user" ? "userBubble" : "assistantBubble"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <span className="assistantBubbleIcon" aria-hidden="true">
                        ✦
                      </span>
                    ) : null}
                    <p>{msg.text}</p>
                  </div>
                </article>
              ))}

              {loading ? (
                <article className="messageGroup assistantGroup">
                  <p className="messageLabel">Rebecca’s Assistant</p>
                  <div className="messageBubble assistantBubble isThinking">
                    <span className="assistantBubbleIcon" aria-hidden="true">
                      ✦
                    </span>
                    <p>
                      {hasPriorAssistantReply ? (
                        <strong>Thinking...</strong>
                      ) : (
                        <>
                          <strong>Thinking...</strong> Rebecca knows how to scale cloud
                          infrastructure. She also knows how to avoid paying for it. First reply may
                          take up to <strong>30 seconds</strong>. 😄
                        </>
                      )}
                    </p>
                  </div>
                </article>
              ) : null}
            </div>

            <div className="suggestionChips" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chipButton"
                  onClick={() => void submitChatMessage(question)}
                  disabled={loading}
                >
                  {question}
                </button>
              ))}
            </div>

            <form className="inputBar" onSubmit={askAssistant}>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about Rebecca’s experience..."
                rows={1}
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()}>
                {loading ? "Thinking…" : "Ask AI"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
