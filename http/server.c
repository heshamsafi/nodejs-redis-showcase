#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>

#define MYPORT "9998"
#define BACKLOG 10
int sockfd,new_fd;

void signal_callback_handler(int signum)
{
   printf("Caught signal %d\n",signum);
   close(sockfd);
   //close(new_fd);
   exit(signum);
}

int main(int argc, char *argv[]){
    struct sockaddr_storage their_addr;
    socklen_t addr_size;
    struct addrinfo hints,*res;
    int count,i;
    char* response = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nTransfer-Encoding: chunked\r\nConnection: keep-alive\r\n\r\n6\r\nHello\n\r\n";
    memset(&hints,0,sizeof hints);
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE;
    getaddrinfo(NULL, MYPORT,&hints,&res);
    sockfd = socket(res->ai_family,res->ai_socktype,res->ai_protocol);
    bind(sockfd, res->ai_addr, res->ai_addrlen);
    listen(sockfd, BACKLOG);
    addr_size = sizeof their_addr;
    signal(SIGINT, signal_callback_handler);
    while(1){
        new_fd = accept(sockfd, (struct sockaddr*)&their_addr,&addr_size);
        count = send(new_fd, response, strlen(response), 0);
        if(count == -1){
            fprintf(stderr,"%s\n",strerror(errno));
            close(sockfd);
            return 1;    
        }
        sleep(1);
        send(new_fd,"6\r\nWorld\n\r\n0\r\n\r\n",strlen("6\r\nWorld\n\r\n0\r\n\r\n"),0);
        if(count == -1){
            fprintf(stderr,"%s\n",strerror(errno));
            close(sockfd);
            return 1;    
        }
        close(new_fd);
    }
    close(new_fd);
    return 0;
}
