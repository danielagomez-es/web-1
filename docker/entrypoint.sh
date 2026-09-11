#!/bin/sh
set -eu

SEED_USER_DIR="/opt/site-seed/user"
RUNTIME_USER_DIR="/data/user"
APP_USER_DIR="/var/www/html/user"

mkdir -p "${RUNTIME_USER_DIR}"

if [ -z "$(ls -A "${RUNTIME_USER_DIR}" 2>/dev/null)" ]; then
  cp -a "${SEED_USER_DIR}"/. "${RUNTIME_USER_DIR}"/
fi

rm -rf "${APP_USER_DIR}"
ln -s "${RUNTIME_USER_DIR}" "${APP_USER_DIR}"
chown -R www-data:www-data "${RUNTIME_USER_DIR}"

exec docker-php-entrypoint "$@"
