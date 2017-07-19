exports.BoardsRepository = {
  getBoards() {
    const ideas = [
      {
        text: 'Hello idea',
        creationDate: new Date().toISOString(),
      },
    ]
    const board = {
      _id: '9765435AB',
      name: 'Hello board',
      ideas,
    }

    return board
  },
}
