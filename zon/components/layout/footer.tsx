

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1 px-8">
          <p className="text-center text-sm leading-normal text-zinc-500 dark:text-zinc-400 md:text-center">
            Built by the ZON community. The source code is available on{" "}
            <a
              href="https://github.com/ZON-Format/ZON"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-center text-sm leading-normal text-muted-foreground">
            Released under the <a href="https://github.com/ZON-Format/ZON/blob/main/LICENSE" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 hover:text-foreground">MIT License</a>.
          </p>
          <p className="text-center text-sm leading-normal text-zinc-500 dark:text-zinc-400 md:text-center">
            Copyright © 2025-PRESENT <a href="https://ronibhakta.in" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300">Roni Bhakta</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
