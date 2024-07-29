import { getProfile } from '@/http/user/get-profile'
import { COOKIES_NAME } from '@/lib/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get(COOKIES_NAME)?.value
}

export function getCurrentOrg() {
  return cookies().get('vehicle_selected_id')?.value ?? null
}

export async function auth() {
  const token = cookies().get(COOKIES_NAME)?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
