create nextwork: docker create mynetwork


Run:
docker run -d --name my-wordpress-1 \
  --network mynetwork \
  -e WORDPRESS_DB_HOST=wordpressdb \
  -e WORDPRESS_DB_USER=princewillopah \
  -e WORDPRESS_DB_PASSWORD=PRINCEWILL@#1980 \
  -e WORDPRESS_DB_NAME=exampledb \
  -p 8080:80 \
  -v wordpress:/var/www/html \
  wordpress



docker run -d --name wordpressdb-1 \
  --network mynetwork \
  -e MYSQL_DATABASE=wordpressdb \
  -e MYSQL_ROOT_PASSWORD=PRINCEWILL@#1980 \
  -v mysql:/var/lib/mysql \
  mysql

  docker run -d --name wordpressdb-1 \
  --network mynetwork \
  -e MYSQL_DATABASE=exampledb \
  -e MYSQL_USER=exampleuser \
  -e MYSQL_PASSWORD=examplepass \
  -e MYSQL_ROOT_PASSWORD=1 \
  -v mysql:/var/lib/mysql \
  mysql:5.7


