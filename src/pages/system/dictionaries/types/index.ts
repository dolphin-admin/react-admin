import type { Nullable } from '@dolphin-admin/utils'

export interface ListSearchParams {
  keywords: string
  code: string
  label: string
  enabled: Nullable<boolean>
  startTime: Nullable<string>
  endTime: Nullable<string>
}

export interface EnableMutationParams {
  id: number
  enabled: boolean
}
