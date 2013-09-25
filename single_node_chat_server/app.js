var sockets = [];
require("net").createServer(function(socket){
   sockets.push(socket);
   console.log(socket);
   socket.write("welcome to node's tcp chat server\n");
   socket.on('data',function(data){
       for(var i=0;i<sockets.length;i++){
           if(sockets[i] == socket) continue;
           sockets[i].write(data);    
       }
   });
   socket.on('close',function(){
       sockets.splice(sockets.indexOf(socket),1); 
   });
}).listen(9999);
