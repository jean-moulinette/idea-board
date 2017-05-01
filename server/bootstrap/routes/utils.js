exports.paramsResolver = {
  get: fetchGetParams,
  post: fetchPostParams,
}

function fetchGetParams(request){
  return request.query
}

function fetchPostParams(request){
  return request.body
}

exports.responseFactory = (response) => {
  return {
    send: (data) => {
      response.send(data)
    }
  }
}

exports.routeFactory = (method, path, handler) => {
  return {
    method,
    path,
    handler,
  }
}