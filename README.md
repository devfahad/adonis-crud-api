> Adonis CRUD API

## Installing on local machine

1. Clone the repository.
2. Change directory to the location of this repository.
3. Create a `.env` file using the included `.env.example` as an example.

## Build Setup

```bash
# install dependencies
$ npm install

# generate secret key
$ node ace key:generate

#run migrations
$ node ace migration:run

# serve on localhost:3333
 $ node ace serve --watch

# build for production and launch server
$ npm build
$ npm start
```

## Official Documentation

For detailed explanation on how things work, check out [Adonis.js docs](https://docs.adonisjs.com/guides/introduction).
