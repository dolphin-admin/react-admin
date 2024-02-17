import type { LoginModel } from '@/api/auth.type'

export interface LoginFormData extends LoginModel {
  rememberPassword: boolean
}
