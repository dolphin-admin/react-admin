import type { LoginModel } from '@/types'

export interface LoginFormData extends LoginModel {
  rememberPassword: boolean
}
