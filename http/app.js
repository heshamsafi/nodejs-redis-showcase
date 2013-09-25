require("http").createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write("Hello\n");
    setTimeout(function(){ res.end("World\n");},1000);
}).listen(9999);
