const Hapi = require('hapi'),
			Inert = require('inert'),
			Path = require('path'),
			publicPath = __dirname + '/public',
			initRoutes = require('./controllers/main')

const port = process.argv[2] || '1337'
const server = new Hapi.Server()

//Register Inert plugin for file and directory API
server.register(Inert, () => {})

server.connection({
	host: 'localhost',
	port,
	routes: {
		files: {
			relativeTo: Path.join(publicPath)
		}
	}
})

initRoutes(server)

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri)
})