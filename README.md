# Daniela Gómez · Escort trans

Sitio estático en español, servido por Nginx y empaquetado como imagen Docker.

## Desarrollo local con Colima

```bash
docker --context colima build -t daniela-gomez:local .
docker --context colima run --rm -p 8080:80 daniela-gomez:local
```

Abre `http://localhost:8080` para ver el sitio.

## GitHub Actions

El workflow `.github/workflows/docker-image.yml` se ejecuta al hacer push a
`main` y publica la imagen en GitHub Container Registry:

```text
ghcr.io/<owner>/<repo>:latest
```

También permite ejecutar un despliegue manual desde la pestaña **Actions**.
Para activarlo, ejecuta el workflow con `deploy: true` y configura estos
secretos del repositorio:

- `DEPLOY_HOST`: servidor que tenga Docker instalado.
- `DEPLOY_USER`: usuario SSH del servidor.
- `DEPLOY_SSH_KEY`: clave privada SSH del usuario de despliegue.
- `GHCR_DEPLOY_USER`: usuario de GitHub con permiso para leer paquetes.
- `GHCR_DEPLOY_TOKEN`: token de GitHub con permiso `read:packages`.

El despliegue remoto publica el contenedor en el puerto 80 con el nombre
`daniela-gomez` y reinicia la versión anterior automáticamente.
