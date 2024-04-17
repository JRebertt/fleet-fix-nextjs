import { env } from '@/env/env'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { COOKIE_NAME } from './cookies'

// config fetch api nextjs
export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  // const apiPrefix = '/api'
  const url = new URL(path, baseUrl)
  return fetch(url, init)
}
const token = getCookie(COOKIE_NAME)

export const apiV2 = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
