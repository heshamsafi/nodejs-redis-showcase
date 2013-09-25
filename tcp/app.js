require("net").createServer(function(socket){
   socket.write("Hello\n");
   socket.end("world\n"); 
}).listen(9999);
