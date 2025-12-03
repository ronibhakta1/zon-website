import { Metadata } from "next"
import { PlaygroundClient } from "@/components/playground-client"

export const metadata: Metadata = {
  title: "Playground | ZON - Zero Overhead Notation",
  description: "Experience ZON's token efficiency in real-time. Convert JSON to ZON and see instant savings on API costs.",
  openGraph: {
    title: "ZON Playground - Interactive JSON to ZON Converter",
    description: "Convert JSON to ZON format and compare token efficiency in real-time",
  },
}

export default function PlaygroundPage() {
  return <PlaygroundClient />
}
