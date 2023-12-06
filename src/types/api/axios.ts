import type { AxiosRequestConfig } from 'axios'

// 响应类型（数据）
export interface R<T = any> {
  code: string
  msg: string
  data: T
  success: boolean
  errors?: string[]
}

// 响应类型（分页）
export interface Page<T = any> {
  records: T[]
  page: number
  pageSize: number
  total: number
}

// 排序枚举类型
export enum OrderType {
  descend = 'desc',
  ascend = 'asc'
}

// 排序参数
export interface Sorter {
  key: string
  order: OrderType
}

// 刷新 token 时，等待请求的任务
export interface PendingTask {
  config?: AxiosRequestConfig
  resolve: (value: unknown) => void
}
