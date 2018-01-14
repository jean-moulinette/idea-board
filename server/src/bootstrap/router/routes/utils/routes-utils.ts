import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'

import { PUBLIC_PATH } from 'src/utils/constants'

export function sendView(fileName: string) {
  return (response: ResponseFactory) => {
    response.sendFile(fileName, {
      root: PUBLIC_PATH,
    })
  }
}
