import React, { useState, type FormEvent } from "react";
import "./style.css";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export default function PortfolioAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I’m Rebecca’s AI Portfolio Assistant. Ask me about her React, Python, AI, full-stack or project experience.\n\n💰 **Cost optimisation level: 100.** The AI is running on a free cloud instance, so if it's been idle it might need a quick coffee break (up to ~50 seconds) before answering.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
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
          text: "Sorry, I can’t reach the AI assistant right now. Please check the backend and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-assistant">
      <div className="assistant-header">
        <span>✨ Built by Rebecca</span>
        <h2>AI Portfolio Assistant</h2>
        <p>
          Ask about my React, Python, AI projects, WebSockets, dashboards or
          full-stack experience.
        </p>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={`${msg.role}-${index}`} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message assistant">Thinking...</div>}
      </div>

      <form className="chat-input" onSubmit={askAssistant}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Rebecca’s experience..."
        />
        <button type="submit">Ask</button>
      </form>
    </section>
  );
}
