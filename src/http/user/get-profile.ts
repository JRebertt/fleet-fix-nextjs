import { api } from '../api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: string
    created_at: string
    avatarUrl?: string | null
  }
}

export async function getProfile() {
  const result = await api.get('me').json<GetProfileResponse>()

  return result
}
