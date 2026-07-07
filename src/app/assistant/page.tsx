import { ChatAssistant } from "@/components/assistant/ChatAssistant";

export default function AssistantPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          AI Assistant
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
          Ask the AI Ayurvedic Assistant
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Scoped wellness guidance grounded in our vetted facts table — general lifestyle
          questions only, not medical advice.
        </p>
      </div>

      <ChatAssistant />
    </div>
  );
}
