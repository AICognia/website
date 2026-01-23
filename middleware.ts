import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Check if Clerk is configured
const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY
)

export async function middleware(request: NextRequest) {
  // If Clerk keys are not configured, allow all requests (preview mode)
  if (!hasClerkKeys) {
    return NextResponse.next()
  }

  // Dynamically import Clerk middleware only if keys are available
  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')

  const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/about',
    '/contact',
    '/demo',
    '/what-we-do',
    '/products/(.*)',
    '/business-intelligence',
    '/industries/(.*)',
    '/solutions',
    '/solutions/(.*)',
    '/api/(.*)',
    '/chat',
    '/company',
    '/features/(.*)',
    '/usecases/(.*)',
    '/privacy-policy',
    '/ai-audit',
    '/sso-callback',
  ])

  // Use Clerk middleware
  const clerkHandler = clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect()
    }
  })

  return clerkHandler(request, {} as any)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
