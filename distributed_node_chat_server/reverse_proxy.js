var net = require("net");
var hosts = [
    { port:9999, host:'127.0.0.1'},
    { port:9998, host:'127.0.0.1'},
    { port:9997, host:'127.0.0.1'},
    { port:9996, host:'127.0.0.1'},
    { port:9995, host:'127.0.0.1'},
    { port:9994, host:'127.0.0.1'},
    { port:9993, host:'127.0.0.1'},
    { port:9992, host:'127.0.0.1'}
];
var counter = 0;
net.createServer(function(socket){
    counter = (counter+1)%hosts.length;
    console.log("forwarding connection to : ", hosts[counter]);
    var hostSocket = net.connect(hosts[counter],function(){
        socket.pipe(hostSocket).pipe(socket);
    }); 
    socket.on('end',function(){
        console.log("destroying socket");
        hostSocket.destroy();
    }); 
}).listen(8000);
