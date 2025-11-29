import { cn } from "@/lib/utils";

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden transform-gpu",
        "[perspective:500px] sm:[perspective:300px] md:[perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(45deg)] sm:[transform:rotateX(40deg)] md:[transform:rotateX(35deg)]">
        <div
          className={cn(
            "[background-repeat:repeat] [background-size:40px_40px] sm:[background-size:50px_50px] md:[background-size:60px_60px]",
            "[height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600%]",
            "[transform:translateZ(0)]"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 0), linear-gradient(to bottom, var(--grid-color) 1px, transparent 0)`,
          }}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-60%" />
    </div>
  );
}
