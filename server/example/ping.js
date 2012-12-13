var winston = require("winston"),
	logger = new (winston.Logger)({transports: [new (winston.transports.Console)({level: 'info'}) ]}),
	createQueen = require("../../");
	
// init http server
var path = require('path'),
	express = require('express'),
	expressServer = express(),
	webRoot = path.resolve(path.dirname(module.filename), '../../client/static'),
	httpServer = require('http').createServer()
								.listen(80, "localhost")
								.on('request', expressServer);

expressServer.use('', express.static(webRoot));

// init socket.io
var socketServer = require("socket.io").listen(httpServer, {log: false}),
	socket = socketServer.of("/capture");

// the example
var	queen = createQueen(socket, {logger:logger.info.bind(logger)});

queen({
	scripts: ['http://localhost/example/ping.js'],
	populate: "continuous",
	killOnStop: false
});
