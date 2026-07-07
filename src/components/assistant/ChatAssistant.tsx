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
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-start gap-3 mb-2 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/20 text-secondary ring-1 ring-secondary/30"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" strokeWidth={1.75} />
                ) : (
                  <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                )}
              </div>
              <div
                className={`rounded-[1.5rem] px-5 py-3.5 text-sm leading-relaxed max-w-[85%] sm:max-w-[75%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md"
                    : "bg-card/70 border border-border/50 text-foreground rounded-tl-sm shadow-sm"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isSending && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 mb-2"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary ring-1 ring-secondary/30 shadow-sm">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="rounded-[1.5rem] rounded-tl-sm px-5 py-3.5 text-sm bg-card/70 border border-border/50 text-muted-foreground shadow-sm flex items-center gap-1.5">
              Thinking
              <span className="flex gap-0.5">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}>.</motion.span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}>.</motion.span>
              </span>
            </div>
          </motion.div>
        )}

        <div ref={scrollRef} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
        className="flex items-end gap-3 bg-black/5 dark:bg-white/5 p-2 rounded-[2rem] border border-black/5 dark:border-white/10 focus-within:bg-black/10 dark:focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-300"
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
          placeholder="Ask me anything..."
          className="min-h-12 bg-transparent border-transparent focus-visible:ring-0 shadow-none resize-none px-4 py-3 rounded-[1.5rem]"
          disabled={isSending}
        />
        <Button 
          type="submit" 
          disabled={isSending || !input.trim()}
          className="rounded-full size-12 shrink-0 bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
        >
          <Send className="h-5 w-5 ml-0.5" />
        </Button>
      </form>
    </GlassCard>
  );
}
