import { COOKIES_NAME } from '@/lib/cookies'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  cookies().delete(COOKIES_NAME)

  return NextResponse.redirect(redirectUrl)
}
