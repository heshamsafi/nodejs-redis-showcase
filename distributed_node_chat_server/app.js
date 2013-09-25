var sockets = [];
var redis = require("redis");//require redis's module
var subClient = redis.createClient();//connect to redis using the default credentials
var globalIncr = 0;//this variable will be used to construct userId
subClient.subscribe("chat_channel");//subscribe to the channel chat_channel on redis
subClient.on("message", function(channel, data) {//when you receive message from redis execute this function
   //notice that i am not checking the channel variable which should have the value "chat_channel" all the time because it is the only channel we have
   data = JSON.parse(data);//deserialize data (i.e change it from string to it's original object form)
   for(var i=0;i<sockets.length;i++){// loop on all sockets and do the usual
       if(sockets[i].userId === data.userId) continue;//notice that i am checking the userId
       sockets[i].write(data.message); 
   }
});
require("net").createServer(function(socket){
   var pubClient = redis.createClient();//create another client for each publisher
   socket.userId = process.pid.toString()+(globalIncr++)+Math.floor(Math.random()*100000);//construct random userId , this is just to ensure randomness and uniqness.
   sockets.push(socket);//push newly connected socket into socket array
   socket.write(process.pid + " : welcome to node's tcp chat server\n");
   socket.on('data',function(data){//when you receive data from this socket execute this function.
     var stringifiedMessage = JSON.stringify({"message":data.toString("utf8"),"userId":socket.userId});//construct this object and serialize it.
     pubClient.publish("chat_channel",stringifiedMessage);//publish this event to all subsribers.
   });
   socket.on('close',function(){
       sockets.splice(sockets.indexOf(socket),1); //remove socket on disconnect
   });
}).listen(require("optimist").argv.port);//listen on port that will be specified on command line argument : port
