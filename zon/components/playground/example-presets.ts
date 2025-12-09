export interface Preset {
  name: string
  description: string
  data: any
}

export const presets: Preset[] = [
  {
    name: "Roni Bhakta",
    description: "GSoC Fellow & Software Developer",
    data: {
      name: "Roni Bhakta",
      role: "Software Developer",
      organization: "Internet Archive",
      gsoc2025: true,
      projects: [
        {
          name: "ZON Format",
          description: "Token-efficient data format for LLMs",
          active: true,
          stack: ["TypeScript", "Python", "Next.js"]
        },
        {
          name: "Lenny",
          description: "Open source lending system for libraries",
          active: true,
          stack: ["Python", "FastAPI", "React", "TypeScript", "Docker"]
        },
        {
          name: "PRS",
          description: "Public Readium Service",
          active: true,
          stack: ["Readium", "OPDS", "Thorium"]
        }
      ],
      expertise: {
        backend: ["Python", "FastAPI", "Node.js"],
        frontend: ["React", "Next.js", "TypeScript"],
        cloud: ["Docker", "Kubernetes", "AWS"],
        ai: ["LLMs", "LangChain", "RAG"]
      },
      openSource: true
    }
  },
  {
    name: "LLM Tools",
    description: "Function calling schema for AI agents",
    data: {
      tools: [
        {
          name: "search_web",
          description: "Search the web for information",
          parameters: {
            query: { type: "string", required: true },
            maxResults: { type: "number", default: 5 }
          }
        },
        {
          name: "send_email",
          description: "Send an email to a recipient",
          parameters: {
            to: { type: "string", required: true },
            subject: { type: "string", required: true },
            body: { type: "string", required: true }
          }
        },
        {
          name: "create_task",
          description: "Create a new task in the project",
          parameters: {
            title: { type: "string", required: true },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            assignee: { type: "string" }
          }
        }
      ],
      context: {
        user: "developer",
        session: "abc123",
        timestamp: "2024-12-09T08:30:00Z"
      }
    }
  },
  {
    name: "Tabular Data",
    description: "Array of objects - where ZON shines",
    data: {
      users: [
        { id: 1, name: "Alice", email: "alice@example.com", role: "admin", active: true },
        { id: 2, name: "Bob", email: "bob@example.com", role: "user", active: true },
        { id: 3, name: "Charlie", email: "charlie@example.com", role: "user", active: false },
        { id: 4, name: "Diana", email: "diana@example.com", role: "moderator", active: true }
      ]
    }
  },
  {
    name: "Simple Object",
    description: "Basic key-value pairs",
    data: {
      name: "Alice Johnson",
      age: 28,
      city: "San Francisco",
      active: true,
      balance: 1250.50
    }
  },
  {
    name: "API Response",
    description: "Realistic API response structure",
    data: {
      status: "success",
      timestamp: "2024-12-09T08:30:00Z",
      data: {
        products: [
          { id: "p1", name: "Laptop", price: 999.99, inStock: true, tags: ["electronics", "computers"] },
          { id: "p2", name: "Mouse", price: 29.99, inStock: true, tags: ["electronics", "accessories"] },
          { id: "p3", name: "Keyboard", price: 79.99, inStock: false, tags: ["electronics", "accessories"] }
        ],
        pagination: {
          page: 1,
          perPage: 10,
          total: 3
        }
      }
    }
  },
  {
    name: "Hikes (TOON Example)",
    description: "The classic hikes example",
    data: {
      context: {
        task: "Our favorite hikes together",
        location: "Boulder",
        season: "spring_2025"
      },
      friends: ["ana", "luis", "sam"],
      hikes: [
        { id: 1, name: "Blue Lake Trail", distanceKm: 7.5, elevationGain: 320, companion: "ana", wasSunny: true },
        { id: 2, name: "Ridge Overlook", distanceKm: 9.2, elevationGain: 540, companion: "luis", wasSunny: false },
        { id: 3, name: "Wildflower Loop", distanceKm: 5.1, elevationGain: 180, companion: "sam", wasSunny: true }
      ]
    }
  }
]

export function getPresetByName(name: string): Preset | undefined {
  return presets.find(p => p.name === name)
}
