//empty array in which we will store connected sockets
var sockets = [];
require("net").createServer(function(socket){
   //push new socket into sockets array
   sockets.push(socket);
   socket.write("welcome to node's tcp chat server\n");//send greeting message to newly connected user.
   socket.on('data',function(data){//when you receive data from this socket, execute this function
       for(var i=0;i<sockets.length;i++){//loop on all connected sockets
           if(sockets[i] == socket) continue;//do nothing if this socket belongs to the user who sent the message
           sockets[i].write(data);//echo that message to this user through this socket
       }
   });
   socket.on('close',function(){//execute this function when this socket disconnects
       sockets.splice(sockets.indexOf(socket),1); //find index of dead socket in array, and then remove it from the array
   });
}).listen(9999);//listen to port 9999
