<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Descripción

Este proyecto es una aplicación de cambio de divisas creada con NestJS, un marco progresivo de Node.js para crear aplicaciones del lado del servidor eficientes, confiables y escalables.

## Empezemos
Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba.
Prerequisites

- Node.js
- npm
## Instalar
1.Clonar el repositorio
```bash
git clone https://github.com/EdwardMayk/pruebaCambio.git
```
2.Instalar dependencias
```bash
$ npm install
```
> [!IMPORTANT]
3.Cree un archivo .env en el directorio raíz del proyecto y agregue su EXCHANGE_RATE_API_KEY:
```bash
EXCHANGE_RATE_API_KEY=<secret-key>
```

## Ejecutar la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Ejecutar the Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Desarrollado en

NestJS - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Features
- Tipos de cambio de divisas en tiempo real
- Autenticación JWT

## API Endpoints
- GET /tipo-cambio: Obtiene el tipo de cambio entre dos monedas. Requiere autenticación JWT.
- GET /generate-token: Obtiene el token de accesso

## Docker
Para crear una imagen Docker de la aplicación, utilice el Dockerfile proporcionado:
```bash
docker build -t <your-image-name> .
```

Para ejecutar la imagen de Docker:
```bash
docker run -p 3000:3000 <your-image-name>
```

Para invocar a la API desde el contenedor, puedes usar curl
```bash
docker exec -it <container-id> curl http://localhost:3000/generate-token

docker exec -it <container-id> curl http://localhost:3000/currency/tipo-cambio?monto='MONTOINGRESADO123'&monedaOrigen=USD&monedaDestino=EUR
```

- Autor - [Edward Mayk](https://www.linkedin.com/in/edmayk/)
- Sitio Web - [https://edwardmayk.github.io/portfolio/](https://edwardmayk.github.io/portfolio/)
