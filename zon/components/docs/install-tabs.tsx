"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"

interface InstallTabsProps {
  args: string
}

export function InstallTabs({ args }: InstallTabsProps) {
  return (
    <Tabs defaultValue="npm" className="w-full mt-6">
      <TabsList>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>
      <TabsContent value="npm">
        <CodeBlock code={`npm install ${args}`} language="bash" />
      </TabsContent>
      <TabsContent value="pnpm">
        <CodeBlock code={`pnpm add ${args}`} language="bash" />
      </TabsContent>
      <TabsContent value="yarn">
        <CodeBlock code={`yarn add ${args}`} language="bash" />
      </TabsContent>
      <TabsContent value="bun">
        <CodeBlock code={`bun add ${args}`} language="bash" />
      </TabsContent>
    </Tabs>
  )
}
