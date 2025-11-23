"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Zap, FileText, Code2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = [
  {
    title: "Human Readable",
    description:
      "Designed to be read and written by humans. No more trailing comma errors or strict quoting rules.",
    icon: FileText,
  },
  {
    title: "Zero Overhead",
    description:
      "Parses faster than JSON in many cases. Optimized for modern JavaScript engines.",
    icon: Zap,
  },
  {
    title: "Type Safe",
    description:
      "Built-in support for types and schema validation. Catch errors before they happen.",
    icon: Shield,
  },
  {
    title: "Streaming Ready",
    description:
      "First-class support for streaming data. Process large datasets with minimal memory footprint.",
    icon: Code2,
  },
]

const jsonExample = `{
  "name": "ZON",
  "version": "1.0.0",
  "features": [
    "fast",
    "readable"
  ],
  "active": true
}`

const zonExample = `name: ZON
version: 1.0.0
features:
  - fast
  - readable
active: true`

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              v1.0 is now available
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl text-primary mb-8">
              The Entropy Engine
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
              ZON is a human-readable, efficient data format designed for the modern web.
              Zero overhead. Zero fatigue.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/docs">
              <Button size="lg" className="h-14 px-10 text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="https://github.com/ZON-Format/ZON" target="_blank">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-background/50 backdrop-blur-sm">
                View on GitHub
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 opacity-20 blur-[100px]"></div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Cleaner. Simpler. Better.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ZON eliminates the noise. No more quotes around keys, no more trailing comma errors.
                Just pure data, formatted for humans.
              </p>
              <ul className="space-y-4 mt-8">
                {["No quoting keys required", "Trailing commas allowed", "Comments supported", "Multi-line strings made easy"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <CodeBlock code={jsonExample} language="json" filename="example.json" className="relative h-full bg-background" />
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <CodeBlock code={zonExample} language="yaml" filename="example.zon" className="relative h-full bg-background border-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose ZON?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for performance, designed for developer happiness.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background border-border/50 hover:border-primary/20 transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Trusted by Developers
            </h2>
            <p className="text-lg text-muted-foreground">
              Join the growing community building with ZON
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10x</div>
              <div className="text-muted-foreground">Faster to Write</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">JSON Compatible</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <div className="text-muted-foreground">Breaking Changes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples with Tabs */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Examples</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              See ZON in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-world examples across different use cases
            </p>
          </div>

          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="api">API Response</TabsTrigger>
              <TabsTrigger value="data">Data Structure</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-muted-foreground">JSON</span>
                    <Badge variant="outline" className="text-xs">Before</Badge>
                  </div>
                 <CodeBlock 
                    code={`{
  "app": {
    "name": "MyApp",
    "port": 3000,
    "debug": true,
    "features": ["auth", "api"]
  }
}`}
                    language="json"
                    filename="config.json"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-primary">ZON</span>
                    <Badge className="text-xs">After</Badge>
                  </div>
                  <CodeBlock 
                    code={`app:
  name: MyApp
  port: 3000
  debug: true
  features:
    - auth
    - api`}
                    language="yaml"
                    filename="config.zon"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-muted-foreground">JSON</span>
                    <Badge variant="outline" className="text-xs">Before</Badge>
                  </div>
                  <CodeBlock 
                    code={`{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "Alice"},
      {"id": 2, "name": "Bob"}
    ]
  }
}`}
                    language="json"
                    filename="response.json"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-primary">ZON</span>
                    <Badge className="text-xs">After</Badge>
                  </div>
                  <CodeBlock 
                    code={`status: success
data:
  users:
    - id: 1
      name: Alice
    - id: 2
      name: Bob`}
                    language="yaml"
                    filename="response.zon"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-muted-foreground">JSON</span>
                    <Badge variant="outline" className="text-xs">Before</Badge>
                  </div>
                  <CodeBlock 
                    code={`{
  "package": {
    "name": "my-lib",
    "version": "1.0.0",
    "dependencies": {
      "react": "^18.0.0"
    }
  }
}`}
                    language="json"
                    filename="package.json"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span className="text-primary">ZON</span>
                    <Badge className="text-xs">After</Badge>
                  </div>
                  <CodeBlock 
                    code={`package:
  name: my-lib
  version: 1.0.0
  dependencies:
    react: ^18.0.0`}
                    language="yaml"
                    filename="package.zon"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ZON
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is ZON compatible with existing JSON parsers?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! ZON is designed to be 100% compatible with JSON. Any valid JSON is also valid ZON, 
                making migration seamless. You can gradually adopt ZON syntax while maintaining compatibility.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                How do I install ZON in my project?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Install via npm: <code className="bg-secondary px-2 py-0.5 rounded">npm install zon-format</code>, 
                bun: <code className="bg-secondary px-2 py-0.5 rounded">bun add zon-format</code>, 
                or pnpm: <code className="bg-secondary px-2 py-0.5 rounded">pnpm add zon-format</code>. 
                Then import and use it just like JSON.parse/stringify.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Does ZON support TypeScript?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! ZON comes with built-in TypeScript definitions and supports full type safety. 
                You get autocomplete, type checking, and all the benefits of TypeScript out of the box.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What&apos;s the performance compared to JSON?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ZON is optimized for speed and in many cases parses faster than JSON due to its simpler syntax. 
                For large datasets, you&apos;ll see up to 30% faster parsing with the same memory footprint.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Can I use ZON in production?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! ZON v1.0 is stable and production-ready. It&apos;s battle-tested, follows semantic versioning, 
                and has comprehensive test coverage. Many teams are already using it in production environments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/40 bg-background">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-8">
            Ready to simplify your data?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the growing community of developers switching to ZON for their configuration and data needs.
          </p>
          <Link href="/docs">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full">
              Read the Docs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
