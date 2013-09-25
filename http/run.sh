#compile C server
gcc server.c

#run node server
node app.js

#run c server
./a.out

#test node server
curl -i localhost:9999

#test c server
curl -i localhost:9998

#benchmarks
#node server, 1 request, concurrency=1, don't stop on errors
ab -n 1 -c 1 -r http://localhost:9999/
#c server, same
ab -n 1 -c 1 -r http://localhost:9998/
#node server, 1000 request, concurrency=1000
ab -n 1000 -c 1000 -r http://localhost:9999/
#c server, same
ab -n 1000 -c 1000 -r http://localhost:9998/
