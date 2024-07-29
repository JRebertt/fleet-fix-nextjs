import { env } from '@/env/env'
import { COOKIES_NAME } from '@/lib/cookies'
import { getCookie } from 'cookies-next'
import { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }
        const token = getCookie(COOKIES_NAME, { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
