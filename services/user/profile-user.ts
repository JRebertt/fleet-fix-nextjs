import { ProfileUserResponse } from '@/@types/users'
import { apiV2 } from '@/lib/api-fetch'

export default async function profileUser() {
  const res = await apiV2.get<ProfileUserResponse>(`/me`)

  return res.data
}
