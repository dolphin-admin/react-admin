import type { User } from '@/types'

export interface LoginModel {
  username: string
  password: string
}

export interface SignupModel extends LoginModel {
  confirmPassword: string
}

export interface UserTokenResponse {
  user: User
  accessToken: string
}
