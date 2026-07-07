"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, User } from "lucide-react";

import { GlassCard } from "@/components/dashboard/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WellnessDisclaimer } from "@/components/WellnessDisclaimer";
import { sendChatMessage } from "@/lib/actions/send-chat-message";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsSending(true);

    const result = await sendChatMessage(trimmed);

    if (result.success) {
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } else {
      setError(result.error);
    }

    setIsSending(false);
  }

  return (
    <GlassCard className="flex flex-col p-6 gap-4">
      <WellnessDisclaimer />

      <div className="flex flex-col gap-4 min-h-[16rem] max-h-[28rem] overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Ask about diet, dosha balance, stress, sleep, or general lifestyle habits — say hi
            to get started.
          </p>
        )}

        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2.5 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/20 text-secondary"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-3.5 w-3.5" strokeWidth={1.75} />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
                )}
              </div>
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-sm max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/70 border border-border/50 text-foreground"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isSending && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            </div>
            <div className="rounded-2xl px-3.5 py-2.5 text-sm bg-card/70 border border-border/50 text-muted-foreground">
              Thinking...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
        className="flex items-end gap-2"
      >
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          className="min-h-11"
          disabled={isSending}
        />
        <Button type="submit" disabled={isSending || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </GlassCard>
  );
}
