export interface Dictionary {
  id: number
  code: string
  label: Record<string, string>
  remark: Record<string, string>
  enabled: boolean
  builtIn: boolean
  sort: number
}
