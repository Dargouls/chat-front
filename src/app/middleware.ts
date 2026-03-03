import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')

  if (host === 'superminichat.vercel.app') {
    const url = request.nextUrl.clone()
    url.hostname = 'www.gabrielzv.com'
    url.pathname = `/superminichat${url.pathname}`
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
