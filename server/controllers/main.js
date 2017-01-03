module.exports = (server) => {

	//Static assets
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true,
				index: true
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
			reply.file('index.html')
		}
	})

}