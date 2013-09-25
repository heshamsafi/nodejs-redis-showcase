//similar to http, but tcp's createServer function accepts function that accepts one argument : socket, unlike http that accepts request,response
require("net").createServer(function(socket){
   socket.write("Hello\n");//self explanatory
   socket.end("world\n"); 
}).listen(9999);//listen to port 9999
