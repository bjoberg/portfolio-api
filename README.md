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

npm run dev

# Navigate to localhost:<env.NODE_PORT>/api/v1/api-docs/
```