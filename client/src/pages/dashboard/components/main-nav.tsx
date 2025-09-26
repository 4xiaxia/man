import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto whitespace-nowrap scrollbar-none touch-pan-x snap-x snap-mandatory bg-white/80 supports-[backdrop-filter]:bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg shadow-clay px-2 sm:px-3 py-2",
        className,
      )}
      {...props}
    >
      <a
        href="#"
        className="snap-start px-2 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-primary"
      >
        总览
      </a>
      <a
        href="#"
        className="snap-start px-2 py-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        客户
      </a>
      <a
        href="#"
        className="snap-start px-2 py-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        产品
      </a>
      <a
        href="#"
        className="snap-start px-2 py-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        设置
      </a>
    </nav>
  );
}
