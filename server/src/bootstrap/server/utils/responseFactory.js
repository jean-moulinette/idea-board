exports.responseFactory = response => ({

  send: function(data) {
    response.send(data)
  },

  sendFile: function(file, options) {
    response.sendFile(file, options)
  },

  setStatus: function(status) {
    response.status(status)
  },

})
