import { Metadata } from "next"
import { PlaygroundClient } from "@/components/playground-client"

export const metadata: Metadata = {
  title: "Playground",
  description: "Experience ZON's token efficiency in real-time. Convert JSON to ZON and see instant savings on API costs.",
  openGraph: {
    title: "ZON Playground - Interactive JSON to ZON Converter",
    description: "Convert JSON to ZON format and compare token efficiency in real-time",
    url: "https://zonformat.org/playground",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ZON Playground",
    description: "Convert JSON to ZON format and compare token efficiency",
  },
  alternates: {
    canonical: "https://zonformat.org/playground",
  },
}

export default function PlaygroundPage() {
  return <PlaygroundClient />
}
