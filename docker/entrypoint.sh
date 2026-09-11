#!/bin/sh
set -eu

SEED_USER_DIR="/opt/site-seed/user"
RUNTIME_USER_DIR="/data/user"
APP_USER_DIR="/var/www/html/user"
MUTABLE_DIRS="accounts backup data pages"

mkdir -p "${RUNTIME_USER_DIR}"

for dir in ${MUTABLE_DIRS}; do
  mkdir -p "${RUNTIME_USER_DIR}/${dir}"

  if [ -d "${SEED_USER_DIR}/${dir}" ] && [ -z "$(ls -A "${RUNTIME_USER_DIR}/${dir}" 2>/dev/null)" ]; then
    cp -a "${SEED_USER_DIR}/${dir}"/. "${RUNTIME_USER_DIR}/${dir}"/
  fi

  rm -rf "${APP_USER_DIR:?}/${dir}"
  ln -s "${RUNTIME_USER_DIR}/${dir}" "${APP_USER_DIR}/${dir}"
done

if ! find "${RUNTIME_USER_DIR}/accounts" -maxdepth 1 -name '*.yaml' | grep -q .; then
  username="${GRAV_ADMIN_USERNAME:-}"
  ******

  if [ -n "${username}" ] && [ -n "${password}" ]; then
    email="${GRAV_ADMIN_EMAIL:-admin@example.com}"
    fullname="${GRAV_ADMIN_FULLNAME:-Site Admin}"
    password_hash="$(php -r 'echo password_hash($argv[1], PASSWORD_BCRYPT);' "${password}")"

    cat > "${RUNTIME_USER_DIR}/accounts/${username}.yaml" <<ACCOUNT
email: ${email}
fullname: ${fullname}
title: Site Admin
hashed_password: '${password_hash}'
language: es
content_editor: markdown
twofa_enabled: false
state: enabled
access:
  admin:
    login: true
    super: true
  site:
    login: true
ACCOUNT
  fi
fi

chown -R www-data:www-data "${RUNTIME_USER_DIR}"

exec docker-php-entrypoint "$@"
