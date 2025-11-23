"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
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
      "Parses faster than JSON in many cases. Optimized for modern LLM tokenizers.",
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface HomePageClientProps {
  quickStartCode: string
  basicEncodingCode: string
  advancedUsageCode: string
}

export function HomePageClient({ quickStartCode, basicEncodingCode, advancedUsageCode }: HomePageClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 flex justify-center">
              <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.0 Entropy Engine
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary mb-6 sm:mb-8 leading-[0.95]">
              Compression <br className="hidden sm:block" />
              for LLMs
            </motion.h1>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium px-4">
              Human-readable data format optimized for LLM token efficiency. 30-42% compression while staying 100% readable.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/docs">
              <Button size="lg" className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
            <Link href="https://github.com/ZON-Format/ZON" target="_blank">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-background/50 backdrop-blur-sm hover:bg-secondary/80 transition-all duration-300">
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

      {/* Benchmarks Section - Moved up for visibility */}
      <section className="py-12 sm:py-16 border-b border-border/40 bg-secondary/10">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-10"
          >
            <Badge variant="secondary" className="mb-2 text-xs">Performance</Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Proven Token Savings
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">
              Real-world compression across diverse datasets
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Standard Datasets */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-semibold">Standard Datasets</h3>
                <div className="text-xs text-muted-foreground">vs JSON</div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { name: "employees.json", reduction: 63.1, color: "from-emerald-500 to-green-600" },
                  { name: "orders.json", reduction: 30.3, color: "from-blue-500 to-cyan-600" },
                  { name: "complex_nested.json", reduction: 76.0, color: "from-purple-500 to-pink-600" },
                ].map((bench, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs sm:text-sm font-medium text-foreground truncate pr-2">{bench.name}</div>
                      <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                        {bench.reduction}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.reduction}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${bench.color}`}
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 8px,
                            rgba(255,255,255,0.15) 8px,
                            rgba(255,255,255,0.15) 16px
                          )`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Real-World Data */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-semibold">Real-World API Data</h3>
                <div className="text-xs text-muted-foreground">vs JSON</div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { name: "Random Users API", reduction: 42.4, color: "from-orange-500 to-red-600" },
                  { name: "StackOverflow Q&A", reduction: 42.4, color: "from-amber-500 to-orange-600" },
                  { name: "GitHub Repos", reduction: 33.9, color: "from-violet-500 to-purple-600" },
                ].map((bench, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs sm:text-sm font-medium text-foreground truncate pr-2">{bench.name}</div>
                      <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                        {bench.reduction}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.reduction}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${bench.color}`}
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 8px,
                            rgba(255,255,255,0.15) 8px,
                            rgba(255,255,255,0.15) 16px
                          )`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-medium text-muted-foreground">Average</div>
                  <div className="text-sm sm:text-base font-bold text-primary whitespace-nowrap">30.5% smaller</div>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-border/50" />
              <div className="text-left">
                <div className="text-xs font-medium text-muted-foreground">vs TOON</div>
                <div className="text-sm sm:text-base font-bold text-green-600 whitespace-nowrap">+24.1% better</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section - Now showing Python usage */}
      <section className="py-16 sm:py-20 md:py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4 sm:space-y-6"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Python Native. LLM Optimized.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                ZON is built for the Python ecosystem. It integrates seamlessly with your existing data pipelines and LLM workflows.
              </motion.p>
              <ul className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                {["Native Python support", "Optimized for token efficiency", "Human-readable format", "Type-safe serialization"].map((item, i) => (
                  <motion.li 
                    key={item} 
                    variants={fadeInUp}
                    custom={i}
                    className="flex items-center gap-3"
                  >
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group w-full max-w-full mt-8 lg:mt-0 overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-20 transition duration-1000 group-hover:opacity-40"></div>
              <div className="relative rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.01]">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border/50 bg-muted/30">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]"></div>
                  <div className="ml-2 text-xs text-muted-foreground font-medium">quick_start.py</div>
                </div>
                <div className="overflow-x-auto">
                  <CodeBlock 
                    code={quickStartCode || "# Loading example..."} 
                    language="python" 
                    filename="quick_start.py" 
                    className="border-0 rounded-none bg-transparent text-xs sm:text-sm" 
                    hideHeader={true}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose ZON?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for performance, designed for developer happiness.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-background border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Code Examples with Tabs */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Examples</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              See ZON in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-world examples fetched directly from our documentation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="basic">Basic Encoding</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <CodeBlock 
                  code={basicEncodingCode || "# Loading example..."}
                  language="python"
                  filename="basic_encoding.py"
                />
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <CodeBlock 
                  code={advancedUsageCode || "# Loading example..."}
                  language="python"
                  filename="advanced_usage.py"
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ZON
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is ZON compatible with existing JSON workflows?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! ZON is designed to be a drop-in replacement for JSON in many Python workflows. 
                  It maps directly to Python dictionaries and lists, making integration seamless.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How do I install ZON?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply run <code className="bg-secondary px-2 py-0.5 rounded">pip install zon-format</code>. 
                  It requires Python 3.8 or higher.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Does ZON support other languages?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, ZON is optimized for Python, but the format specification is open and language-agnostic. 
                  Community drivers for other languages are welcome!
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Why use ZON for LLMs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  ZON significantly reduces token usage compared to JSON (30-40% reduction), which directly translates 
                  to lower API costs and faster inference times for Large Language Models.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Can I use ZON in production?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! ZON v1.0 is stable and production-ready. It&apos;s battle-tested, follows semantic versioning, 
                  and has comprehensive test coverage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/40 bg-background">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold tracking-tight mb-8">
              Ready to simplify your data?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the growing community of developers switching to ZON.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/docs">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Read the Docs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
