//require in node is like "include" in C/C++ or "import" in java but the required module is returned as the return value of the require function.
require("http").createServer(function(req/*request object*/,res/*response object*/){
    //write http header in response
    res.writeHead(200/*200 is the status code for ok in HTTP*/,{'content-type':'text/plain'});//content type is plain text not xml not json not html not image file.
    res.write("Hello\n");//write Hello in http response body
    setTimeout(function(){ res.end("World\n");},1000);//wait one second(1000 millisecond) and write world.
}).listen(9999);//listen to port 9999
