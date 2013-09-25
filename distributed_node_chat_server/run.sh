#run redis assuming that it is in the PATH environment variable
redis-server
#otherwise cd to the directory where it resides and run
./redis-server

#run node server on port 9999
node app.js --port=9999

#run another on port 9998
node app.js --port=9998

#run another on port 9997
node app.js --port=9997

# repeat till port 9992

#connect to any server
nc localhost {port_of_server}

#run reverser proxy
node reverse_proxy.js

#connect to reverse proxy
nc localhost 8000
#use the same port for all the clients you wish to connect, after all that is the point from using reverse proxy
