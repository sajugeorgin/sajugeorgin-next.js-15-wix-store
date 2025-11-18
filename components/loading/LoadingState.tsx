import { Loader2 } from "lucide-react";

export function LoadingState({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{text}...</span>
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}
