//Require the express moule
const express = require("express");

//create a new express application
const app = express()

//require the http module
const http = require("http").Server(app)

// require the socket.io module
const io = require("socket.io")(http);

const port = 4444;

//const socket = io(http);
//create an event listener



/// code block for http request from socket.io to django
const bodyParser = require("body-parser");

//funcion auxiliar que permite acceder a la data cruda mediante bodyparser
var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

//bloque de codigo que permite manejar los GET request
app.get('/', function(req, res) {
   res.sendFile( __dirname+'/index.html');
});

//code block for incoming http request from TTN
// also emit a event & message to the django socket
app.post('/',function (request,response){

	let objs = JSON.parse(request.rawBody);
	response.send('POST request to the URL succesfull---> \n');
	console.log("\nPOST request succesfull");

	//emiting the event and message to all the clients
	io.sockets.emit('post_in_express',objs);
});


//wire up the server to listen to our port 500
http.listen(port, ()=>{
console.log("connected to port: "+ port)
});
