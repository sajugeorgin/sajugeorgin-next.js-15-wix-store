import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent align-center rounded-md", className)}
      {...props}
    ></div>
  );
}

export { Skeleton };
