

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-100 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-zinc-500 md:text-center">
            Built by the ZON community. The source code is available on{" "}
            <a
              href="https://github.com/ZON-Format/ZON"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-zinc-900 hover:text-zinc-700"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
