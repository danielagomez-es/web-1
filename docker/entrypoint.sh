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
  admin_password="$(printenv GRAV_ADMIN_PASSWORD 2>/dev/null || true)"

  if [ -n "${username}" ] && [ -n "${admin_password}" ]; then
    email="${GRAV_ADMIN_EMAIL:-admin@example.com}"
    fullname="${GRAV_ADMIN_FULLNAME:-Site Admin}"
    case "${username}${email}${fullname}" in
      *'
'*) echo "admin bootstrap values must not contain newlines" >&2; exit 1 ;;
    esac
    case "${username}" in
      *[!A-Za-z0-9_.-]*|'') echo "GRAV_ADMIN_USERNAME contains unsupported characters" >&2; exit 1 ;;
    esac
    password_hash="$(php -r 'echo password_hash($argv[1], PASSWORD_BCRYPT);' "${admin_password}")"
    php -r '
      $path = $argv[1];
      $data = [
        "email" => getenv("GRAV_ADMIN_EMAIL") ?: "admin@example.com",
        "fullname" => getenv("GRAV_ADMIN_FULLNAME") ?: "Site Admin",
        "title" => "Site Admin",
        "hashed_password" => $argv[2],
        "language" => "es",
        "content_editor" => "markdown",
        "twofa_enabled" => false,
        "state" => "enabled",
        "access" => [
          "admin" => ["login" => true, "super" => true],
          "site" => ["login" => true],
        ],
      ];
      $quote = static function ($value): string {
        return "'"'"'" . str_replace("'"'"'", "'"'"''"'"'", (string) $value) . "'"'"'";
      };
      $yaml = "email: " . $quote($data["email"]) . PHP_EOL;
      $yaml .= "fullname: " . $quote($data["fullname"]) . PHP_EOL;
      $yaml .= "title: " . $quote($data["title"]) . PHP_EOL;
      $yaml .= "hashed_password: " . $quote($data["hashed_password"]) . PHP_EOL;
      $yaml .= "language: " . $quote($data["language"]) . PHP_EOL;
      $yaml .= "content_editor: " . $quote($data["content_editor"]) . PHP_EOL;
      $yaml .= "twofa_enabled: false" . PHP_EOL;
      $yaml .= "state: " . $quote($data["state"]) . PHP_EOL;
      $yaml .= "access:" . PHP_EOL;
      $yaml .= "  admin:" . PHP_EOL;
      $yaml .= "    login: true" . PHP_EOL;
      $yaml .= "    super: true" . PHP_EOL;
      $yaml .= "  site:" . PHP_EOL;
      $yaml .= "    login: true" . PHP_EOL;
      file_put_contents($path, $yaml);
    ' "${RUNTIME_USER_DIR}/accounts/${username}.yaml" "${password_hash}"
  fi
fi

chown -R www-data:www-data "${RUNTIME_USER_DIR}"

exec docker-php-entrypoint "$@"
