import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const getGitHubStars = unstable_cache(
  async () => {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ZON-Website'
    }

    // Add GitHub token if available (optional, increases rate limit)
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const [resPy, resTs] = await Promise.all([
      fetch('https://api.github.com/repos/ZON-Format/zon', { 
        headers,
        cache: 'no-store'
      }),
      fetch('https://api.github.com/repos/ZON-Format/zon-ts', {  
        headers,
        cache: 'no-store'
      })
    ])

    if (!resPy.ok || !resTs.ok) {
      const errorPy = !resPy.ok ? await resPy.text() : null
      const errorTs = !resTs.ok ? await resTs.text() : null
      console.error('GitHub API error:', { errorPy, errorTs })
      throw new Error('Failed to fetch from GitHub API')
    }

    const [dataPy, dataTs] = await Promise.all([
      resPy.json(),
      resTs.json()
    ])

    return {
      starsPy: dataPy.stargazers_count,
      starsTs: dataTs.stargazers_count
    }
  },
  ['github-stars'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['github-stars']
  }
)

export async function GET() {
  try {
    const data = await getGitHubStars()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch GitHub stars',
      starsPy: 0,
      starsTs: 0
    }, { status: 500 })
  }
}
