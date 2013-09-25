var sockets = [];
var optimist = require("optimist");
var redis = require("redis");
var subClient = redis.createClient();
var globalIncr = 0;
subClient.subscribe("chat_channel");
subClient.on("message", function(channel, data) {
   data = JSON.parse(data);
   for(var i=0;i<sockets.length;i++){
       if(sockets[i].userId === data.userId) continue;
       sockets[i].write(data.message); 
   }
});
require("net").createServer(function(socket){
   var pubClient = redis.createClient();
   socket.userId = process.pid.toString()+(globalIncr++)+Math.floor(Math.random()*100000);
   sockets.push(socket);
   socket.write(process.pid + " : welcome to node's tcp chat server\n");
   socket.on('data',function(data){
     var stringifiedMessage = JSON.stringify({"message":data.toString("utf8"),"userId":socket.userId});
     pubClient.publish("chat_channel",stringifiedMessage);
   });
   socket.on('close',function(){
       sockets.splice(sockets.indexOf(socket),1); 
   });
}).listen(optimist.argv.port);
