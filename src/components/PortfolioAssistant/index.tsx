import React, { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import "./style.css";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export default function PortfolioAssistant() {
  const apiBaseUrl =
    (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "http://localhost:8000";
  const chatEndpoint = `${apiBaseUrl.replace(/\/$/, "")}/chat`;
  const messagesViewportRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "What AI projects has Rebecca built?",
    "Tell me about her React experience",
    "How has she used Python?",
    "What full-stack work has she done?",
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I’m Rebecca’s AI Portfolio Assistant. Ask me about her React, Python, AI, full-stack or project experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const hasPriorAssistantReply = messages.some(
    (message, index) => message.role === "assistant" && index > 0
  );

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply ?? "I couldn’t generate a reply.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn’t reach the assistant just now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <section id="assistant-chat" className="aiAssistantSection">
      <div className="assistantFeatureCard">
        <div className="assistantHeader">
          <div className="assistantHeaderContent">
            <span className="assistantBadge">✨ Built by Rebecca</span>
            <h2>AI Portfolio Assistant</h2>
          </div>
          <a className="assistantCta" href="#featured-projects">
            <span className="assistantCtaTitle">Interested in how I built this?</span>
            <span className="assistantCtaBody">
              Explore the architecture, backend workflow, prompt design and deployment approach
              behind this AI feature.
            </span>
            <span className="assistantCtaAction">View Project →</span>
          </a>
        </div>

        <div className="chatPanel">
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
                onClick={() => void sendMessage(question)}
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
  );
}
