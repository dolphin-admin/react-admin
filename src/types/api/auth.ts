import type { User } from '@/types'

export interface LoginModel {
  username: string
  password: string
}

export interface SignupModel extends LoginModel {
  confirmPassword: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface UserToken extends Token {
  user: User
}

export interface ChangePasswordModel {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
