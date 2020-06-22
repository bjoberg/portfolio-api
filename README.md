# Brett Oberg Photography API

![Production](https://github.com/bjoberg/bo-portfolio-api/workflows/Production/badge.svg)
![Release](https://github.com/bjoberg/bo-portfolio-api/workflows/Release/badge.svg)

API for accessing Brett Oberg Studio portfolio items

## Dependencies

- [Postgres](https://hub.docker.com/_/postgres)
- PgAdmin

## Local Setup

1. Start dependencies
``` bash
# start postgres docker container
docker run -p 5432:5432 --name bo-portfolio-db -e "POSTGRES_PASSWORD=postgres" -d postgres

# start pgadmin docker container
docker run -p 80:80 -e "PGADMIN_DEFAULT_EMAIL=user@domain.com" -e "PGADMIN_DEFAULT_PASSWORD=SuperSecret" -d dpage/pgadmin4
```
2. Clone the repository: `git clone https://github.com/bjoberg/portfolio-api.git`
3. Install dependencies: `npm install`
4. Make a copy of `.env.example` and name it `.env`: `cp ./.env.example .env`
5. Set all of the variables in the new .env file
```txt
NODE_ENV="development"
PG_USERNAME="postgres"
PG_PASSWORD="postgres"
PG_DATABASE="portfolio"
PG_HOST="127.0.0.1"
```
6. Create a new db in your local database
7. Migrate the data tables:
```bash
export PG_USERNAME=postgres
export PG_PASSWORD=postgres
export PG_DATABASE=portfolio
export PG_HOST=127.0.0.1
cd src/database && sequelize db:migrate
```
8. Seed the local database: `cd src/database && sequelize db:seed:all`
9. Start the application: `npm run dev`
10. Navigate to `localhost:<env.NODE_PORT>/api/v1/api-docs/`

### Notes

```bash
# To get local postgres port run
docker inspect <CONTAINER_ID>
```

## Production Build

```bash
docker build -t "<tag_name>" .
docker run -p 8080:8080 -d "<tag_name>"
```

## Deploy

```bash
heroku container:login
heroku container:push web -a bo-portfolio-api
heroku container:release web --app bo-portfolio-api
```