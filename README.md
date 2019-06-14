# Portfolio API

API for accessing Brett Oberg Studio portfolio items

## Local Setup

1. Setup local [postgres database](https://hub.docker.com/_/postgres).
2. Install dependencies
```bash
git clone https://github.com/bjoberg/portfolio-api.git
cd portfolio-api
npm install

# Make a copy of .env.example and name it .env
cp ./.env.example .env

# Set all of the variables in the new .env file

# Migrate the tables into your local database
export PG_USERNAME=<local_db_username>
export PG_PASSWORD=<local_db_password>
export PG_DATABASE=<local_db_database>
export PG_HOST=<local_db_host>
cd src/database && ../../node_modules/.bin/sequelize db:migrate

# Seed the local database
cd src/database && ../../node_modules/.bin/sequelize db:seed:all

npm run dev

# Navigate to localhost:<env.NODE_PORT>/api/v1/api-docs/
```

## Production Build

```bash
docker build -t "<tag_name>"
docker run -p 8080:8080 -d "<tag_name>"
```

## Deploy

```bash
heroku container:login
heroku container:push web -a bo-portfolio-api
heroku container:release web --app bo-portfolio-api
```