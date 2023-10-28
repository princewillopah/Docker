FROM php:8-fpm-alpine3.17

# we chose "/var/www/html" as workdir as it is the same folder specified by root in nginx conf "root /var/www/html/public"
WORKDIR /var/www/html

# now copy the generated laravel files from src to WORKDIR
COPY src .

# This command uses this tool "docker-php-ext-install"  to install both dependencies pdo pdo_mysql that the laravel eed
RUN docker-php-ext-install pdo pdo_mysql

#to ensure that this default user "www-data" whicch is setup by the base image has permission or right access to the folder "/var/www/html" which holds our source code and since laravel need to generate files in that folder durring the php code execution, eg log files or cache views, we need to grant this right access here
RUN chown -R www-data:www-data /var/www/html

# If you do not have a CMD or ENTRYPOINT, the CMD of thebased imagewill be used as the CMD for this image