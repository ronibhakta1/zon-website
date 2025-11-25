import { cn } from "@/lib/utils";

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden [perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={cn(
            "[background-repeat:repeat] [background-size:60px_60px]",
            "[height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600%]",
            // Zinc-400 lines for better visibility
            "[background-image:linear-gradient(to_right,#a1a1aa_1px,transparent_0),linear-gradient(to_bottom,#a1a1aa_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 to-transparent to-90%" />
    </div>
  );
}
