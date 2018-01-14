import { Request } from 'express-serve-static-core'

import { HttpMethodNameLower } from 'src/bootstrap/router/constants'

export type RequestData = {
  [key: string]: any
}

export default class RequestFactory {
  private request: Request

  public constructor(request: Request) {
    this.request = request
  }

  public fetchData(httpMethod: HttpMethodNameLower): RequestData {
    const dataResolver = this.dataResolverFactory()

    return dataResolver[httpMethod]
      ? dataResolver[httpMethod]()
      : {}
  }

  private dataResolverFactory() {
    return {
      get: this.fetchGetParams,
      post: this.fetchPostParams,
      head: () => ({}),
      connect: () => ({}),
      options: () => ({}),
      trace: () => ({}),
      patch: () => ({}),
      delete: () => ({}),
      put: () => ({}),
      all: () => ({}),
    }
  }

  private fetchGetParams() {
    return this.request.query
  }

  private fetchPostParams() {
    return this.request.body
  }

}
