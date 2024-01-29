import type { AxiosRequestConfig } from 'axios'

import type { OrderType } from './axios.enum'

// 响应数据
export interface R<T = unknown> {
  /**
   * 状态码
   */
  msg: string
  /**
   * 数据
   */
  data: T
}

// 分页数据
export interface Page<T = unknown> {
  /**
   * 数据列表
   */
  records: T[]
  /**
   * 当前页码
   */
  page: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 总条数
   */
  total: number
}

// 排序参数
export interface Sorter {
  /**
   * 排序字段
   */
  key: string
  /**
   * 排序方式
   */
  order: OrderType
}

// 刷新 token 时，等待请求的任务
export interface PendingTask {
  /**
   * 请求配置
   */
  config?: AxiosRequestConfig
  /**
   * 请求成功后的回调
   */
  resolve: (value: unknown) => void
}
