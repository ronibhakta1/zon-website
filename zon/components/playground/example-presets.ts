export interface Preset {
  name: string
  description: string
  data: any
}

export const presets: Preset[] = [
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
    name: "Tabular Data (ZON's Sweet Spot)",
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
    name: "Nested Structure",
    description: "Complex nested objects and arrays",
    data: {
      company: "TechCorp",
      founded: 2015,
      departments: [
        {
          name: "Engineering",
          headCount: 45,
          teams: ["Backend", "Frontend", "DevOps"]
        },
        {
          name: "Sales",
          headCount: 23,
          teams: ["Enterprise", "SMB"]
        }
      ],
      metadata: {
        lastUpdated: "2024-12-01",
        version: "1.0.5"
      }
    }
  },
  {
    name: "API Response",
    description: "Realistic API response structure",
    data: {
      status: "success",
      timestamp: "2024-12-01T07:45:00Z",
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
    name: "Hikes Example (from TOON)",
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
