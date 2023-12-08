run:
    dk build -t my-app . && dk run -d -rm -p 8080:80 --name my-app  my-app