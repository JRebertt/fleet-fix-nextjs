export interface ProfileUser {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

export interface ProfileUserResponse {
  user: ProfileUser
}
