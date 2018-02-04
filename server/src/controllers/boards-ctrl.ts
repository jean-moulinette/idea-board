import BoardsRepository from 'src/repositories/boards/boards-repo';
import ResponseFactory from 'src/bootstrap/server/utils/responseFactory';

type GetBoardForUserData = {
  user?: string,
};

export async function getBoardsForUser(
  response: ResponseFactory,
  requestData: GetBoardForUserData,
) {
  let boards = null;

  if (!requestData.user) {
    const errorMessage = 'Unable to find "user" in query params';
    response.setStatus(422);
    response.send(errorMessage);
  }

  try {
    boards = await BoardsRepository.getOwnedBoardsForUser(requestData.user);
  } catch (e) {
    const errorMessage = 'Could not find board for user due to internal error';
    response.setStatus(500);
    response.send(errorMessage);
  
    throw e;
  }

  if (!boards || boards instanceof Array && boards.length === 0) {
    response.setStatus(404);
    response.send('Not found');
    return;
  }

  response.sendJSON(boards);
}
