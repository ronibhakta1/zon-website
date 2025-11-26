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
            // Zinc-300 lines for subtle premium feel
            "[background-image:linear-gradient(to_right,#d4d4d8_1px,transparent_0),linear-gradient(to_bottom,#d4d4d8_1px,transparent_0)]",
            "[transform:translateZ(0)]"
          )}
        />
      </div>

      {/* Background Gradient - Very aggressive fade from top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 via-transparent to-zinc-100 from-[0%] via-[50%] to-[80%]" />
    </div>
  );
}
