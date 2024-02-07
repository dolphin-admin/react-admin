import { StatusCode } from '@/api/axios.enum'

/**
 * 响应状态码 Map
 * @description 用于获取响应状态码对应的错误信息
 */
export const errorMessageMap = new Map<number, string>([
  [StatusCode.BAD_REQUEST, '400: Bad Request!'],
  [StatusCode.UNAUTHORIZED, '401: Unauthorized!'],
  [StatusCode.FORBIDDEN, '403: Forbidden!'],
  [StatusCode.NOT_FOUND, '404: NotFound!'],
  [StatusCode.METHOD_NOT_ALLOWED, '405: Method Not Allowed!'],
  [StatusCode.CONFLICT, '409: Conflict!'],
  [StatusCode.UNPROCESSABLE_ENTITY, '422: Unprocessable Entity!'],
  [StatusCode.TOO_MANY_REQUESTS, '429: Too Many Requests!'],
  [StatusCode.INTERNAL_SERVER_ERROR, '500: Internal Server Error!'],
  [StatusCode.BAD_GATEWAY, '502: Bad Gateway!'],
  [StatusCode.GATEWAY_TIMEOUT, '504: Gateway Timeout!']
])
