export interface Response {
  code?: number | string
  message?: string
}

export interface BaseResponse<T = any> extends Response {
  data: T
}

export interface PageResponse<T = any> extends Response {
  data: T
  page: number
  pageSize: number
  total: number
}

export enum OrderType {
  descend = 'desc',
  ascend = 'asc'
}

export interface Sorter {
  key: string
  order: OrderType
}
