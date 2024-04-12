'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/cookies'

export async function logoutUser() {
  const cookieStore = cookies()

  cookieStore.delete(COOKIE_NAME)
}
