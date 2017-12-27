FROM ous/gobear:v0.0.11

# Makre sure www-data own /var/www
RUN chown -R www-data:www-data /var/www

USER www-data
ADD ./run.sh /var/www/run.sh
RUN sh /var/www/run.sh

WORKDIR /var/www/node-gobear
USER root
CMD service apache2 start && service mysql start && yarn start