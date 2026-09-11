FROM php:8.3-apache

WORKDIR /var/www/html

ARG GRAV_VERSION=2.0.26
ARG GRAV_ADMIN_SHA256=6315b1035962678c16a76a114205d8e1ce61cd65131ca0a1876c24393b130e68

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl libcurl4-openssl-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libxml2-dev libzip-dev unzip \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install curl dom gd zip \
  && a2enmod expires headers rewrite \
  && rm -rf /var/www/html/* \
  && curl -fsSL -o /tmp/grav-admin.zip "https://github.com/getgrav/grav/releases/download/${GRAV_VERSION}/grav-admin-v${GRAV_VERSION}.zip" \
  && echo "${GRAV_ADMIN_SHA256}  /tmp/grav-admin.zip" | sha256sum -c - \
  && unzip -q /tmp/grav-admin.zip -d /tmp \
  && cp -a /tmp/grav-admin/. /var/www/html/ \
  && rm -rf /var/www/html/user/pages/* \
  && rm -rf /tmp/grav-admin /tmp/grav-admin.zip \
  && rm -rf /var/lib/apt/lists/*

COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY docker/apache-site.conf /etc/apache2/sites-available/000-default.conf
COPY robots.txt /var/www/html/robots.txt
COPY sitemap.xml /var/www/html/sitemap.xml
COPY user/accounts/ /var/www/html/user/accounts/
COPY user/config/ /var/www/html/user/config/
COPY user/pages/ /var/www/html/user/pages/
COPY user/themes/ /var/www/html/user/themes/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
  && mkdir -p /opt/site-seed \
  && cp -a /var/www/html/user /opt/site-seed/user \
  && mkdir -p /data/user \
  && mkdir -p /data/user/accounts /data/user/backup /data/user/data /data/user/pages \
  && chown -R www-data:www-data /var/www/html/user /opt/site-seed/user /data/user /var/www/html/assets /var/www/html/backup /var/www/html/cache /var/www/html/images /var/www/html/logs /var/www/html/tmp

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["apache2-foreground"]
