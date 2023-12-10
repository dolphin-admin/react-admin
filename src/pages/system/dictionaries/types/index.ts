import type { Nullable } from '@dolphin-admin/utils'

export interface ListSearchParams {
  searchText: string
  code: string
  label: string
  enabled: Nullable<boolean>
  builtIn: Nullable<boolean>
  startTime: Nullable<string>
  endTime: Nullable<string>
}

export interface EnableMutationParams {
  id: number
  enabled: boolean
}
