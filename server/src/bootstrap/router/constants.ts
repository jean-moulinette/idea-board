export const HTTP_METHOD: { [key: string]: HttpMethodNameUpper } = {
  GET: 'GET',
  POST: 'POST',
  HEAD: 'HEAD',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
  ALL: 'ALL',
}

export type HttpMethodNameLower = 'get' |
  'post' |
  'head' |
  'connect' |
  'options' |
  'trace' |
  'patch' |
  'delete' |
  'put' |
  'all'

export type HttpMethodNameUpper = 'GET' |
  'POST' |
  'HEAD' |
  'CONNECT' |
  'OPTIONS' |
  'TRACE' |
  'PATCH' |
  'DELETE' |
  'PUT' |
  'ALL'
