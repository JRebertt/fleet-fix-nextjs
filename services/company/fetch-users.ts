import { Users } from '@/components/driver-form'
import { api } from '@/lib/api-fetch'

interface FetchUsersResponse {
  users: Users[]
}

export default async function fetchUsers(): Promise<Users[]> {
  const res = await api(`/users`, {
    cache: 'no-store',
  })

  const { users }: FetchUsersResponse = await res.json()

  return users || []
}
