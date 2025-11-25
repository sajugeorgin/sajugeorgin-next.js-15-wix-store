import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProductBadge({ children, className }: BadgeProps) {
  return (
    <span className={cn("w-fit bg-gray-300 px-2 py-1 text-xs", className)}>
      {children}
    </span>
  );
}
