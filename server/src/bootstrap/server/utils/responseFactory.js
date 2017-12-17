exports.responseFactory = response => ({

  send: function(data) {
    if (!this.isResponseSent()) response.send(data)
  },

  sendJSON: function(data) {
    if (!this.isResponseSent()) {
      this.setHeader('Content-Type', 'application/json')
      this.send(JSON.stringify(data))
    }
  },

  sendFile: function(file, options) {
    if (!this.isResponseSent) response.sendFile(file, options)
  },

  setStatus: function(status) {
    if (!this.isResponseSent()) response.status(status)
  },

  setHeader: function(key, value) {
    if (!this.isResponseSent()) response.setHeader(key, value)
  },

  sendError: function(e, status) {
    const error = {
      details: e.message,
    }

    this.setStatus(status)
    this.send(JSON.stringify(error))
  },

  isResponseSent: function() {
    return response.headersSent === true
  },
})
