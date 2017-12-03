exports.responseFactory = response => ({

  send: function(data) {
    response.send(data)
  },

  sendJSON: function(data) {
    response.setHeader('Content-Type', 'application/json')
    response.send(JSON.stringify(data))
  },

  sendFile: function(file, options) {
    response.sendFile(file, options)
  },

  setStatus: function(status) {
    response.status(status)
  },

  sendError: function(e, status) {
    const error = {
      details: e.message,
    }
    response.status(status)
    response.send(JSON.stringify(error))
  },
})
