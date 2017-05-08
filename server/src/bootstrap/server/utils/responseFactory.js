exports.responseFactory = response => ({

  send: function(data) {
    response.send(data)
  },

  setStatus: function(status) {
    response.status(status)
  },

})
