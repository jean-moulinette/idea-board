exports.requestFactory = (request) => ({

  dataResolverFactory: function() {
    return {
      get: this.fetchGetParams,
      post: this.fetchPostParams,
    }
  },

  fetchGetParams: function() {
    return request.query
  },

  fetchPostParams: function() {
    return request.body
  },

  fetchData: function(httpMethod){
    const dataResolver = this.dataResolverFactory()

    return dataResolver[httpMethod]
      ? dataResolver[httpMethod]()
      : {}
  }

})
