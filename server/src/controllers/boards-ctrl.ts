import BoardsRepository from 'src/repositories/boards/boards-repo'
import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'

type GetBoardForUserData = {
  user: string
}

export async function getBoardsForUser(
  response: ResponseFactory,
  requestData: GetBoardForUserData
) {
  const { user } = requestData

  let boards

  try {
    boards = await BoardsRepository.getOwnedBoardsForUser(user)
  } catch (e) {
    const errorMsg = 'Could not find board for user due to internal error'
    response.setStatus(500)
    response.sendJSON({
      message: errorMsg
    })

    console.error(errorMsg)
    console.trace()
  }

  response.sendJSON(boards)
}
