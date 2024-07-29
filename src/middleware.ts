import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const response = NextResponse.next()
  // const params: Record<string, string> = {}

  // searchParams.forEach((value, key) => {
  //   params[key] = value
  // })

  // console.log('Todos os parâmetros de consulta:', params)

  const pageParams = searchParams.has('page')
  if (!pageParams) {
    // console.log('passou')
    // searchParams.set('page', '3')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
