import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user
  if (!user) {
    const login = new URL('/login', request.url)
    login.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(login)
  }
}

export const config = {
  matcher: ['/add-book', '/my-books', '/my-borrows', '/profile', '/books/:path'],
}
