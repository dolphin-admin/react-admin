/**
 * 常用响应状态码
 * @description
 * 1xx: Informational - 请求已接收，继续处理
 * 2xx: Success - 请求已成功被服务器接收、理解、并接受
 * 3xx: Redirection - 需要后续操作才能完成这一请求
 * 4xx: Client Error - 请求含有词法错误或者无法被执行
 * 5xx: Server Error - 服务器在处理某个正确请求时发生错误
 */
export enum StatusCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504
}

export enum OrderType {
  descend = 'desc',
  ascend = 'asc'
}
