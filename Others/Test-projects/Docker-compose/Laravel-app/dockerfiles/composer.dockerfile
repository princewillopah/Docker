FROM composer:latest
WORKDIR /var/www/html

ENTRYPOINT ["composer", "--ignore-platform-reqs"]
# pass the --ignore-platform-reqs and / or --no-scripts flags to install or update