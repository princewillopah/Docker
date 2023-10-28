FROM nginx:stable-alpine

#
WORKDIR /etc/nginx/conf.d

# copy nginx/nginx.conf from our local dir into the current workdir "/etc/nginx/conf.d" so we can now have /etc/nginx/conf.d/nginx.conf. this is the dir that is needed by nginx which will be included in the main nginx.conf file
# the "." here signifies working dir "/etc/nginx/conf.d"
COPY nginx/nginx.conf .
# "/etc/nginx/conf.d/nginx.conf" is not the actual file. "/etc/nginx/conf.d/default.conf." is the actual file hat should be above. so we will rename it in the container
RUN mv nginx.conf default.conf
# then we have to now choose ou main working dir being "/var/www/html"
WORKDIR /var/www/html
# now copy the generated laravel files from src to WORKDIR
COPY src .

# WE DO NOT NEED TO SPECIFY THE cmd OR entrypoint SINCE THE BASED IMAGE HAS SUCH AND WILL EXECUTE THE COMMAND

