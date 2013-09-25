var net = require("net");
//array of all the host servers you wish to proxy.
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
var counter = 0;//counter that will be used to select the server using round robin algorithm
net.createServer(function(socket){
    counter = (counter+1)%hosts.length;//round robin
    console.log("forwarding connection to : ", hosts[counter]);
    var hostSocket = net.connect(hosts[counter],function(){//establish tcp connection with selected server
        socket.pipe(hostSocket).pipe(socket);//connect the socket the user used to connect to proxy with the socket the proxy used to connect to host server in both direction so that any data sent in either socket will end up in the other socket.
    }); 
    socket.on('end',function(){//on socket close
        console.log("destroying socket");
        hostSocket.destroy();//destroy underlying socket that was connected to the closing socket.
    }); 
}).listen(8000);//listen to port 8000
