# CrudApp [![TravisCI](https://travis-ci.org/hyoyou/crud-app-elixir.svg?branch=master)]

[Production Application URL](http://crud-app-dev.us-east-1.elasticbeanstalk.com/#/)

## Prerequisites
* Elixir 1.5
* Phoenix 1.4.1
* PostgreSQL 11
* Docker 2
* npm to install Node.js dependencies


## Setup
* Create Distillery release with:

```
$ mix release
```

* Install dependencies with:

```
$ mix deps.get
```

* Create and migrate your database with (May need to also run with MIX_ENV=prod and/or MIX_ENV=test, depending on environment you want to set it up for):

```
$ mix ecto.setup
```

* Install Vue.js with:

```
$ npm install vue
```

* Install Node.js dependencies with:

```
$ cd assets && npm install
```

* To use Docker, run Makefile build task with:

```
$ make build
```

* Set up environment variables. Copy sample_env file contents into a .env file. Run in terminal:

```
$ eval $(cat .env)
```

## Running the Tests
* To run Phoenix tests:

```
$ mix test
```

* To run Vue.js tests:

```
$ cd assets && npm run test:unit -- --watch
```


## Running the Server

* To run the database in the background with Docker:

```
$ docker-compose up -d postgres
```

* To start your Phoenix server:

```
$ mix phx.server
``` 
& navigate to localhost:[port #] that is output to terminal


## Stopping the Server

* To stop the database running in the background:

```
$ docker-compose down
```

* To stop the Phoenix server:

Hit `ctrl` + `C` twice